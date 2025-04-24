const Student = require('../models/Student');
const Internship = require('../models/Internship');

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    console.error('Error creating student:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    
    // Handle duplicate key error (e.g., duplicate email)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate field value entered',
        error: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating student',
      error: error.message
    });
  }
};

// Get student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('appliedInternships.internship')
      .populate('mentor', 'name email');
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching student',
      error: error.message
    });
  }
};

// Apply for an internship
exports.applyForInternship = async (req, res) => {
  try {
    const { studentId, internshipId } = req.params;
    
    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Check if internship exists
    const internship = await Internship.findById(internshipId);
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: 'Internship not found'
      });
    }
    
    // Check if internship is available
    if (!internship.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'This internship is no longer available'
      });
    }
    
    // Check if student has already applied for this internship
    const alreadyApplied = student.appliedInternships.some(
      app => app.internship.toString() === internshipId
    );
    
    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this internship'
      });
    }
    
    // Add internship to student's applied internships
    student.appliedInternships.push({
      internship: internshipId,
      status: 'pending',
      appliedDate: Date.now()
    });
    
    await student.save();
    
    res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      data: student
    });
  } catch (error) {
    console.error('Error applying for internship:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while applying for internship',
      error: error.message
    });
  }
};

// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { studentId, internshipId } = req.params;
    const { status, feedback } = req.body;
    
    // Validate status
    if (!['pending', 'accepted', 'rejected', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: pending, accepted, rejected, completed'
      });
    }
    
    // Find student and update application status
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Find the application in the appliedInternships array
    const applicationIndex = student.appliedInternships.findIndex(
      app => app.internship.toString() === internshipId
    );
    
    if (applicationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }
    
    // Update the application status and feedback
    student.appliedInternships[applicationIndex].status = status;
    if (feedback) {
      student.appliedInternships[applicationIndex].feedback = feedback;
    }
    
    await student.save();
    
    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: student
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating application status',
      error: error.message
    });
  }
};

// Assign mentor to student
exports.assignMentor = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { mentorId } = req.body;
    
    // Find student
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Update mentor
    student.mentor = mentorId;
    await student.save();
    
    res.status(200).json({
      success: true,
      message: 'Mentor assigned successfully',
      data: student
    });
  } catch (error) {
    console.error('Error assigning mentor:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while assigning mentor',
      error: error.message
    });
  }
}; 