import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import AuctionSession from '../Models/AuctionSessionModel.js';
import User from '../Models/UserModel.js';

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('joinAuction', async ({ sessionId, token }) => {
      try {
        const decoded = jwt.verify(token, 'user-secret-code');
        const userId = decoded._id;

        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        socket.join(sessionId);
        console.log(`Client joined auction ${sessionId}`);

        await AuctionSession.findByIdAndUpdate(sessionId, { $addToSet: { participants: userId } });
        const updatedSession = await AuctionSession.findById(sessionId).populate('participants');

        const participants = await User.find({ _id: { $in: updatedSession.participants } }, 'name');
        io.to(sessionId).emit('updateParticipants', participants);
      } catch (error) {
        console.error('Error verifying token or adding participant to session:', error);
      }
    });

    socket.on('leaveAuction', async ({ sessionId, token }) => {
      try {
        const decoded = jwt.verify(token, 'user-secret-code');
        const userId = decoded._id;
        
        socket.leave(sessionId);
        console.log(`Client left auction ${sessionId}`);

        await AuctionSession.findByIdAndUpdate(sessionId, { $pull: { participants: userId } });
        const updatedSession = await AuctionSession.findById(sessionId).populate('participants');

        const participants = await User.find({ _id: { $in: updatedSession.participants } }, 'name');
        io.to(sessionId).emit('updateParticipants', participants);
      } catch (error) {
        console.error('Error verifying token or removing participant from session:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

export default setupSocket;
