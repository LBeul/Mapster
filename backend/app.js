import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import authRouter from './controllers/auth.js';
import locationsRouter from './controllers/locations.js';
import errorHandler from './utils/errorHandler.js';

const app = express();

// Configure mongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to mongoDB'))
  .catch((e) => console.error('Error connecting to mongoDB:', e.message));

// Invoke middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Invoke routers
app.use('/users', authRouter);
app.use('/nonsusloc', locationsRouter);

// Use custom error handler
app.use(errorHandler);

export default app;
