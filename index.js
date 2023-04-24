const express = require('express');
const http = require('http');
const cors = require('cors');
const moment = require('moment-timezone');
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = require('socket.io')(server);
let roomList = ['test'];
const fetch = require('node-fetch');


app.post('/api/getRoom', function (req, res) {
  res.send(roomList);
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('getRoomIds', () => {
    console.log('return room');
    io.emit('getRoom', roomList);
  })

  socket.on('join', (roomId) => {
    roomList.push(roomId);
    roomList = [...new Set(roomList)];
    io.emit('getRoom', roomList);
    console.log('user joined room: ' + roomId);
    socket.join(roomId); 
    socket.roomId = roomId; 
  });

  socket.on('changeRoom', ( newRoom ) => {
    console.log('changeROom', newRoom);
    
    roomList.push(newRoom);
    roomList = [...new Set(roomList)];
    io.emit('getRoom', roomList);
    socket.join(newRoom);
    socket.roomId = newRoom;
  });

  socket.on('chat', async (data) => {
    console.log('user sent message: ' + data);
    console.log("socker Room id",socket.roomId);
    let token = data.token;
    let ress;
    try {
      await fetch(`http://192.168.0.5:8000/api/auth/me`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then(async (data) => {
            ress = await data.json();
          })
          .catch(async (err) => {
            console.log(err);
          });
      let now = new Date();

      const rooms = io.sockets.adapter.rooms;
      const roomNames = Object.keys(rooms);

      console.log('roomNames',roomNames);
      let times = moment().tz("Asia/Seoul"); 
      let returnData = {
        'message': data.message,
        'name': ress.name,
        'roomName': socket.roomId,
        'created_at': times.format('YYYY-MM-DD HH:mm:ss')
      }
      io.to(socket.roomId).emit('chat', returnData);
      await fetch(`http://192.168.0.5:8000/api/msgSave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(returnData)
      }).then(async (data) => {
        console.log('resasdasd', await data.json());
      })
      .catch(async (err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('leave', () => {
    console.log('user left room: ' + socket.roomId);
    socket.leave(socket.roomId); // 해당 방에서 나감
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, '192.168.0.5');
