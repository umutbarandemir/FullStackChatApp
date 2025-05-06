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

export function getReceiverSocketId(userId) { // Function to get the socket ID of a user
    return userSocketMapping[userId]; // Return the socket ID for the given user ID
}

// for storing online users
const userSocketMapping = {}; 

io.on('connection', (socket) => { // Listen for a new connection
    console.log('User connected:', socket.id); 

    const userId = socket.handshake.query.userId; // Get the userId from the query parameters
    if (userId) {
        userSocketMapping[userId] = socket.id; // Store the socket ID for the user
    }

    io.emit('onlineUsers', Object.keys(userSocketMapping)); // Emit the online users to all connected clients

    socket.on('disconnect', () => { // Listen for disconnection
        console.log('User disconnected:', socket.id);
        delete userSocketMapping[userId]; // Remove the user from the mapping
        io.emit('onlineUsers', Object.keys(userSocketMapping)); // Emit the updated online users to all connected clients
    });
});

export {io, server, app};