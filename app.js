import express from 'express';
import http from 'http';
import { startWebSocketServer } from './src/websocket/server.js';

const app = express();
const server = http.createServer(app);


app.get('/', (req, res) => {
    res.send('Crypto Screener API running');
});

startWebSocketServer(server);

server.listen(3000, () => {
    console.log('🚀 Server running on http://localhost:3000');
  });
