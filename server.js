const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/internship-platform')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import routes
const internshipRoutes = require('./routes/internships');
const studentRoutes = require('./routes/students');
const facultyRoutes = require('./routes/faculty');

// Use routes
app.use('/api/internships', internshipRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/faculty', facultyRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Internship Platform API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 