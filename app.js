import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookstore';

mongoose.connect(MONGODB_URI, {
  dbName: 'bookstore',
})
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

import adminRoutes from './routes/admin.js';
import apiRoutes from './routes/api.js';
app.use('/admin', adminRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.redirect('/admin');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 