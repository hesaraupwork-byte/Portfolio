const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed' });
  }
});

app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

app.get('/health', (req, res) => {
  const states = ['DISCONNECTED', 'CONNECTED', 'CONNECTING', 'DISCONNECTING'];
  res.status(200).json({
    status: 'UP',
    database: states[mongoose.connection.readyState] || 'UNKNOWN',
    timestamp: new Date(),
  });
});

module.exports = app;
