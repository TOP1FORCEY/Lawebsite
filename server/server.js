const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error:', error));

// Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
});
const User = mongoose.model('User', userSchema);

// Routes
app.post('/submit', async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  try {
    const newUser = new User({ name, phone });
    await newUser.save();
    res.json({ success: true, message: 'Data saved successfully!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save data.' });
  }
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});