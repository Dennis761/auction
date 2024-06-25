import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import setupSocket from './SocketModel/socketHandler.js';  // Проверьте правильность пути

import auctionRoutes from './Routes/SessionRoutes.js';
import productRoutes from './Routes/ProductRoutes.js';
import { login } from './Controllers/Login.js';

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);  // Подключаем WebSocket

const PORT = 4444;
const db = 'mongodb+srv://millerden45:qetuo159@cluster0.ufrk5m5.mongodb.net/blog?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

app.post('/auth/login', login);
app.use('/auctions', auctionRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

server.listen(PORT, (err) => {
  if (err) {
    return console.error(err);
  } else {
    return console.log(`Server running on PORT:${PORT}`);
  }
});
