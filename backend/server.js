import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import formRoutes from './routes/formRoutes.js';

dotenv.config();

const app = express();

connectDB();

app.use(cors()); 
app.use(express.json());

app.use('/api', formRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint not found.' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});