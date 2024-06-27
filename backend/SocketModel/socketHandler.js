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

    // Обработчик для получения ID пользователя
    socket.on('getUserId', ({ token }, callback) => {
      try {
        const decoded = jwt.verify(token, 'user-secret-code'); // Замените 'your_jwt_secret' на ваш секретный ключ
        callback(decoded._id);
      } catch (error) {
        console.error('Error verifying token:', error);
      }
    });

    socket.on('joinAuction', async ({ sessionId, token }) => {
      try {
        // Проверка и расшифровка токена
        const decoded = jwt.verify(token, 'user-secret-code');
        const userId = decoded._id;

        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        socket.join(sessionId);
        console.log(`Client joined auction ${sessionId}`);

        // Обновление базы данных
        await AuctionSession.findByIdAndUpdate(sessionId, { $addToSet: { participants: userId } });
        const updatedSession = await AuctionSession.findById(sessionId).populate('participants');

        // Получение имен участников
        const participants = await User.find({ _id: { $in: updatedSession.participants } }, 'name');
        io.to(sessionId).emit('updateParticipants', participants.map(p => ({ _id: p._id, name: p.name })));
      } catch (error) {
        console.error('Error verifying token or adding participant to session:', error);
      }
    });

    socket.on('leaveAuction', async ({ sessionId, token }) => {
      try {
        // Проверка и расшифровка токена
        const decoded = jwt.verify(token, 'user-secret-code');
        const userId = decoded._id;

        socket.leave(sessionId);
        console.log(`Client left auction ${sessionId}`);

        // Обновление базы данных
        await AuctionSession.findByIdAndUpdate(sessionId, { $pull: { participants: userId } });
        const updatedSession = await AuctionSession.findById(sessionId).populate('participants');

        // Получение имен участников
        const participants = await User.find({ _id: { $in: updatedSession.participants } }, 'name');
        io.to(sessionId).emit('updateParticipants', participants.map(p => ({ _id: p._id, name: p.name })));
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