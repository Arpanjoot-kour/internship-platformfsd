const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
  appliedInternships: [{
    internship: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Internship',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'completed'],
      default: 'pending'
    },
    appliedDate: {
      type: Date,
      default: Date.now
    },
    feedback: {
      type: String,
      trim: true
    }
  }],
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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
studentSchema.index({ email: 1 });
studentSchema.index({ department: 1 });
studentSchema.index({ mentor: 1 });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student; 