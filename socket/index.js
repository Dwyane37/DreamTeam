import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: 'http://localhost:3000',
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) && onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on('connection', (socket) => {
  console.log('connected');

  socket.on('newUser', (username) => {
    console.log('newuser');
    addNewUser(username, socket.id);
    console.log(onlineUsers);
  });

  socket.on('applyJob', ({ senderName, receiverName, jobID }) => {
    const receiver = getUser(receiverName);
    const msg = `${senderName} applied your job ${jobID}`;
    io.to(receiver.socketId).emit('getApplication', {
      msg,
    });
  });

  //   socket.on('sendText', ({ senderName, receiverName, text }) => {
  //     const receiver = getUser(receiverName);
  //     console.log(receiver);
  //     io.to(receiver.socketId).emit('getText', {
  //       senderName,
  //       text,
  //     });
  //   });

  //   socket.on('logout', () => {
  //     removeUser(socket.id);
  //   });

  socket.on('disconnect', () => {
    console.log('disconnect');
    removeUser(socket.id);
  });
});

io.listen(5005);
