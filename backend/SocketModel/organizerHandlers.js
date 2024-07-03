import jwt from 'jsonwebtoken';
import AuctionSession from '../Models/AuctionSessionModel.js';
import AuctionProduct from '../Models/AuctionProductModel.js';
import { productValidator } from '../Validator/ProductValidator.js';
import { validationResult } from 'express-validator';

export const handleCreateAuction = (io, socket) => {
  socket.on('createAuction', async ({ token, productInfo }, callback) => {
    try {
      const decoded = jwt.verify(token, 'user-secret-code');
      const creatorId = decoded._id;

      const req = { body: productInfo };

      await Promise.all(productValidator.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        callback({ status: 400, errors: errors.array() });
        return;
      }

      const { title, description, aboutProduct, imageURL, location, country, price, time } = productInfo;

      const auctionProduct = new AuctionProduct({
        title,
        description,
        aboutProduct,
        imageURL,
        location,
        country,
        price,
        time
      });

      const savedProduct = await auctionProduct.save();

      const auctionSession = new AuctionSession({
        creatorId,
        _id: savedProduct._id,
        time
      });

      const newSession = await auctionSession.save();

      socket.join(newSession._id.toString());
      io.to(socket.id).emit('updateParticipants', newSession.participants);

      callback({ status: 201, auctionProduct: savedProduct, newSession });
    } catch (error) {
      console.error('Error creating auction or session:', error);
      callback({ status: 500, message: 'Internal server error' });
    }
  });
};

export const handleDeleteAuction = (socket) => {
  socket.on('deleteAuction', async ({ token, sessionId }, callback) => {
    try {
      const decoded = jwt.verify(token, 'user-secret-code');
      const userId = decoded._id;

      const session = await AuctionSession.findById(sessionId);
      if (!session || session.creatorId.toString() !== userId) {
        callback({ status: 404, message: 'Session not found or user is not the creator' });
        return;
      }

      const productId = session._id;

      await AuctionSession.findByIdAndDelete(sessionId);
      await AuctionProduct.findByIdAndDelete(productId);

      socket.leave(sessionId);
      console.log(`Auction with session ${sessionId} deleted`);

      callback({ status: 200, message: 'Auction deleted successfully' });
    } catch (error) {
      console.error('Error deleting auction or session:', error);
      callback({ status: 500, message: 'Internal server error' });
    }
  });
};
 
export const handleStartAuctionTimer = (io, socket) => {
  socket.on('startAuctionTimer', async ({ token, sessionId }, callback) => {
    try {
      const decoded = jwt.verify(token, 'user-secret-code');
      const userId = decoded._id;

      const session = await AuctionSession.findById(sessionId);
      if (!session) {
        callback({ status: 404, message: 'Session not found' });
        return;
      }
      
      if (session.creatorId.toString() !== userId) {
        callback({ status: 403, message: 'User is not the creator of the session' });
        return;
      }

      session.open = false;
      await session.save();

      const endTime = Date.now() + session.time * 1000;
      io.to(sessionId).emit('auctionStarted', { endTime });
      startAuctionTimer(io, sessionId, session.time);
      callback({ status: 200, message: 'Auction timer started successfully' });
    } catch (error) {
      console.error('Error starting auction timer:', error);
      callback({ status: 500, message: 'Internal server error' });
    }
  });
};

const startAuctionTimer = (io, sessionId, time) => {
  const endTime = Date.now() + time * 1000;

  const interval = setInterval(async () => {
    const currentTime = Date.now();
    if (currentTime >= endTime) {
      clearInterval(interval);
      await AuctionSession.findByIdAndUpdate(sessionId, { open: false });
      io.to(sessionId).emit('auctionEnded', { sessionId });
    } else {
      const remainingTime = Math.max(0, endTime - currentTime);
      io.to(sessionId).emit('updateTime', { remainingTime });
    }
  }, 1000);
};
