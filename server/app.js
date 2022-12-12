import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoutes from './routes/authRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());
mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server running on ${process.env.PORT}`)
    )
  );

//routes
app.use('/api', AuthRoutes);
