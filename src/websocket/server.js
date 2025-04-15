import { Server } from 'socket.io';
import { handleClientSocket } from './clientHandlers.js';

export function startWebSocketServer(httpServer) {
    const io = new Server(httpServer, {
      cors: { origin: '*' },
    });
  
    io.on('connection', (socket) => {
      console.log('📡 Client connected:', socket.id);
      handleClientSocket(socket, io);
    });
}