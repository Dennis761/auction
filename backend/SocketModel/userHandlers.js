import jwt from 'jsonwebtoken';

export const handleGetUserId = (socket) => {
  socket.on('getUserId', ({ token }, callback) => {
    try {
      const decoded = jwt.verify(token, 'user-secret-code');
      const userId = decoded._id;
      callback(userId);
    } catch (error) {
      console.error('Error verifying token:', error);
      callback(null);
    }
  });
};
