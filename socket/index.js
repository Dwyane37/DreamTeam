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

  socket.on('newJob', ({ senderName, receiverName, jobID }) => {
    console.log('receive');
    console.log(onlineUsers);
    const receiver = getUser(receiverName);
    io.to(receiver?.socketId).emit('getNotification', {
      sender: senderName,
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

  socket.on('disconnect', () => {
    console.log('disconnect');
    removeUser(socket.id);
  });
});

io.listen(5005);
