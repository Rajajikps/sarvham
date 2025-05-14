/* config/db.js */
const mongoose = require('mongoose');

// Connect to MongoDB
define.connectDB = async () => {
  try {
    // Mongoose v6+ defaults are fine; just pass URI
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;


/* server.js */
require('dotenv').config();            // Load .env variables
const express = require('express');
const path = require('path');
const cors = require('cors');

const connectDB = require('./config/db');
const contactRouter   = require('./routes/contact');
const volunteerRouter = require('./routes/volunteer');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());                     // Allow cross-origin
app.use(express.json());              // Parse JSON bodies

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use('/api/contact',   contactRouter);
app.use('/api/volunteer', volunteerRouter);

// Fallback: serve index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
