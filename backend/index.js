import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';
import setupSocket from './SocketModel/socketHandler.js';
import connectDB from './Services/db.js';
import authRoutes from './Routes/authRoutes.js'; // Import routes

dotenv.config(); // Load environment variables

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

const PORT = process.env.PORT || 4444; // Get PORT from .env

app.use(cors());
app.use(express.json());

connectDB(); // Connect to MongoDB

// Register routes
app.use('/auth', authRoutes);

server.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server running on PORT:${PORT}`);
  }
});
