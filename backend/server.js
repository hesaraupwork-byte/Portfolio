require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const app = express();

// Connect to Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Import Routes
const projectRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

// Bind Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Base Route / Health Check
app.get('/health', (req, res) => {
  const states = ['DISCONNECTED', 'CONNECTED', 'CONNECTING', 'DISCONNECTING'];
  res.status(200).json({
    status: 'UP',
    database: states[mongoose.connection.readyState] || 'UNKNOWN',
    timestamp: new Date()
  });
});

// Setup Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
