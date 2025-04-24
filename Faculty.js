const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  specialization: {
    type: String,
    trim: true
  },
  assignedStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create indexes for better search performance
facultySchema.index({ email: 1 });
facultySchema.index({ department: 1 });
facultySchema.index({ specialization: 1 });

const Faculty = mongoose.model('Faculty', facultySchema);

module.exports = Faculty; 