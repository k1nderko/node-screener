import { subscribeToBinancePair } from '../services/wsManager.js';

export function handleClientSocket(socket, io) {
  socket.on('subscribe', (pair) => {
    console.log(`Client ${socket.id} subscribed to ${pair}`);
    subscribeToBinancePair(pair, (data) => {
      socket.emit('priceUpdate', data);
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
}