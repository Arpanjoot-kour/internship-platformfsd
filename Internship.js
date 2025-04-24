const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true
  },
  sector: {
    type: String,
    required: [true, 'Industry sector is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  requirements: {
    type: [String],
    required: [true, 'At least one requirement is needed'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Requirements array cannot be empty'
    }
  },
  sdgs: {
    type: [String],
    required: [true, 'At least one SDG must be selected'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'SDGs array cannot be empty'
    }
  },
  pos: {
    type: [String],
    required: [true, 'At least one Program Outcome must be selected'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Program Outcomes array cannot be empty'
    }
  },
  peos: {
    type: [String],
    required: [true, 'At least one Program Educational Objective must be selected'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Program Educational Objectives array cannot be empty'
    }
  },
  isAvailable: {
    type: Boolean,
    default: true
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
internshipSchema.index({ title: 'text', description: 'text', company: 'text' });
internshipSchema.index({ department: 1 });
internshipSchema.index({ sector: 1 });
internshipSchema.index({ sdgs: 1 });
internshipSchema.index({ pos: 1 });
internshipSchema.index({ peos: 1 });
internshipSchema.index({ isAvailable: 1 });

const Internship = mongoose.model('Internship', internshipSchema);

module.exports = Internship; 