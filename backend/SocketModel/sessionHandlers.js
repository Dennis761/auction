import jwt from 'jsonwebtoken';
import AuctionSession from '../Models/AuctionSessionModel.js';
import AuctionProduct from '../Models/AuctionProductModel.js';
import User from '../Models/UserModel.js';

export const handleJoinAuction = (io, socket) => {
  socket.on('joinAuction', async ({ sessionId, token, bid = 0 }, callback) => {
    try {
      const decoded = jwt.verify(token, 'user-secret-code');
      const userId = decoded._id;

      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      socket.join(sessionId);
      console.log(`Client joined auction ${sessionId}`);

      const session = await AuctionSession.findById(sessionId);
      if (!session) {
        throw new Error('Session not found');
      }

      const participant = session.participants.find(p => p.userId.toString() === userId);
      if (participant) {
        participant.bid = bid;
      } else {
        session.participants.push({ userId, bid });
      }

      await session.save();

      const updatedSession = await AuctionSession.findById(sessionId).populate('participants.userId', 'name');
      const participants = updatedSession.participants.map(p => ({
        userId: {
          _id: p.userId._id,
          name: p.userId.name
        },
        bid: p.bid
      }));

      io.to(sessionId).emit('updateParticipants', participants);
      io.to(session.creatorId.toString()).emit('updateParticipants', participants); 
      callback({ status: 200, participants });
    } catch (error) {
      console.error('Error joining auction:', error);
      callback({ status: 500, message: 'Internal server error' });
    }
  });
};

export const handleLeaveAuction = (io, socket) => {
  socket.on('leaveAuction', async ({ sessionId, token }, callback) => {
    try {
      const decoded = jwt.verify(token, 'user-secret-code');
      const userId = decoded._id;

      socket.leave(sessionId);
      console.log(`Client left auction ${sessionId}`);

      const session = await AuctionSession.findById(sessionId);
      if (!session) {
        throw new Error('Session not found');
      }

      session.participants = session.participants.filter(p => p.userId.toString() !== userId);
      await session.save();

      const updatedSession = await AuctionSession.findById(sessionId).populate('participants.userId', 'name');
      const participants = updatedSession.participants.map(p => ({
        _id: p.userId._id,
        name: p.userId.name,
        bid: p.bid
      }));

      io.to(sessionId).emit('updateParticipants', participants);
      io.to(session.creatorId.toString()).emit('updateParticipants', participants); 
      callback({ status: 200, participants });
    } catch (error) {
      console.error('Error leaving auction:', error);
      callback({ status: 500, message: 'Internal server error' });
    }
  });
};

export const handleFetchSessions = (socket) => {
  socket.on('fetchSessions', async (callback) => {
    try {
      const sessions = await AuctionSession.find({ open: true });

      const findProducts = await Promise.all(
        sessions.map(async (session) => {
          const product = await AuctionProduct.findById(session._id);
          return { session, product };
        })
      );

      callback({ status: 200, findProducts });
    } catch (error) {
      console.error('Error fetching sessions:', error);
      callback({ status: 500, message: 'Internal server error' });
    }
  });
};

export const handleFetchSessionById = (socket) => {
  socket.on('fetchSessionById', async ({ sessionId }, callback) => {
    try {
      const session = await AuctionSession.findById(sessionId);
      if (!session) {
        callback({ status: 404, message: 'Session not found' });
        return;
      }

      const product = await AuctionProduct.findById(session._id);
      if (!product) {
        callback({ status: 404, message: 'Product not found' });
        return;
      }

      callback({ status: 200, product, session });
    } catch (error) {
      console.error('Error fetching session:', error);
      callback({ status: 500, message: 'Internal server error' });
    }
  });
};

export const handlePlaceBid = (io, socket) => {
  socket.on('placeBid', async ({ token, sessionId, bid }, callback) => {
    try {
      const decoded = jwt.verify(token, 'user-secret-code');
      const userId = decoded._id;

      const session = await AuctionSession.findById(sessionId).populate('participants.userId', 'name');
      if (!session) {
        callback({ status: 404, message: 'Session not found' });
        return;
      }

      const participant = session.participants.find(p => p.userId._id.toString() === userId);
      if (participant) {
        if (bid <= participant.bid) {
          callback({ status: 400, message: 'New bid must be higher than the current bid' });
          return;
        }
        participant.bid = bid;
      } else {
        session.participants.push({ userId, bid });
      }
      await session.save();

      io.to(sessionId).emit('updateParticipants', session.participants);
      io.to(session.creatorId.toString()).emit('updateParticipants', session.participants);
      callback({ status: 200, participants: session.participants });
    } catch (error) {
      console.error('Error placing bid:', error);
      callback({ status: 500, message: 'Internal server error' });
    }
  });
};
