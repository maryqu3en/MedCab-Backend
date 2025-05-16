const { Server } = require('socket.io');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*', // Adjust this for production
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('New user connected:', socket.id);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      console.log(`Socket ${socket.id} joined room ${roomId}`);
    });

    socket.on('typing', ({ roomId, senderId }) => {
      socket.to(roomId).emit('typing', { senderId });
    });
  
    socket.on('stopTyping', ({ roomId, senderId }) => {
      socket.to(roomId).emit('stopTyping', { senderId });
    });

    socket.on('sendMessage', ({ roomId, senderId, message }) => {
      const createdAt = new Date().toISOString();
      io.to(roomId).emit('receiveMessage', { senderId, message, createdAt });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = { initSocket };
