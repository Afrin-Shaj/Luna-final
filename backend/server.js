import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from './config/index.js'; // Keep using import for config
import authRoutes from './routes/auth.js'; // Keep using import for routes
import userRoutes from './routes/user.js'; // Keep using import for routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Connect to MongoDB
mongoose.connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
