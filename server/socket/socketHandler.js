const socketIO = require('socket.io');

const onlineUsers = new Map(); // userId -> socketId

const initSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.IO] New client connected: ${socket.id}`);

    // Join User Room
    socket.on('user:join', (userData) => {
      if (userData && userData.id) {
        socket.userId = userData.id;
        onlineUsers.set(userData.id, socket.id);
        socket.join(`user_${userData.id}`);
        if (userData.role) {
          socket.join(`role_${userData.role}`);
        }
        io.emit('user:presence', { userId: userData.id, status: 'online' });
        console.log(`[Socket.IO] User ${userData.name || userData.id} joined room user_${userData.id}`);
      }
    });

    // Chat Typing Indicator
    socket.on('chat:typing', ({ receiverId, isTyping }) => {
      if (receiverId) {
        io.to(`user_${receiverId}`).emit('chat:typing', {
          senderId: socket.userId,
          isTyping,
        });
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      if (socket.userId) {
        onlineUsers.delete(socket.userId);
        io.emit('user:presence', { userId: socket.userId, status: 'offline' });
        console.log(`[Socket.IO] User ${socket.userId} disconnected`);
      }
    });
  });

  return io;
};

module.exports = initSocket;
