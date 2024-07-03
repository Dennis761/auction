import { Server } from 'socket.io';
import { handleGetUserId } from './userHandlers.js';
import { handleJoinAuction, handleLeaveAuction, handleFetchSessions, handleFetchSessionById, handlePlaceBid } from './sessionHandlers.js';
import { handleCreateAuction, handleDeleteAuction, handleStartAuctionTimer } from './organizerHandlers.js';

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    handleGetUserId(socket);

    handleJoinAuction(io, socket);
    handleLeaveAuction(io, socket);
    handleFetchSessions(socket);
    handleFetchSessionById(socket);
    handlePlaceBid(io, socket);

    handleCreateAuction(io, socket);
    handleDeleteAuction(socket);
    handleStartAuctionTimer(io, socket);

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  return io;
};

export default setupSocket;
