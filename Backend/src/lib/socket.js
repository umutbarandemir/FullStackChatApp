import {Server} from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, { // Create a new Socket.IO server instance
  cors: {
    origin: ['http://localhost:5173'],
  },
});

io.on('connection', (socket) => { // Listen for a new connection
    console.log('User connected:', socket.id); 

    socket.on('disconnect', () => { // Listen for disconnection
        console.log('User disconnected:', socket.id);
    });
});

export {io, server, app};