import WebSocket from 'ws';

const binanceStreams = {}; // { 'btcusdt': wsInstance }
const subscribers = {}; // { 'btcusdt': [callback, callback] }

export function subscribeToBinancePair(pair, callback) {
  const key = pair.toLowerCase();

  if (!subscribers[key]) subscribers[key] = [];
  subscribers[key].push(callback);

  if (binanceStreams[key]) return;

  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${key}@trade`);

  ws.on('message', (data) => {
    const trade = JSON.parse(data);
    const payload = {
      pair: key,
      price: trade.p,
      time: trade.T,
    };

    if (subscribers[key]) {
      for (const cb of subscribers[key]) {
        cb(payload);
      }
    }
  });

  ws.on('open', () => console.log(`Connected to Binance for ${key}`));
  ws.on('close', () => console.log(`Binance stream closed for ${key}`));

  binanceStreams[key] = ws;
}
