const Faculty = require('../models/Faculty');
const Student = require('../models/Student');

// Create a new faculty member
exports.createFaculty = async (req, res) => {
  try {
    const faculty = new Faculty(req.body);
    await faculty.save();
    
    res.status(201).json({
      success: true,
      message: 'Faculty member created successfully',
      data: faculty
    });
  } catch (error) {
    console.error('Error creating faculty member:', error);
    
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
      message: 'Server error while creating faculty member',
      error: error.message
    });
  }
};

// Get faculty by ID
exports.getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id)
      .populate('assignedStudents', 'name email department');
    
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: faculty
    });
  } catch (error) {
    console.error('Error fetching faculty member:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching faculty member',
      error: error.message
    });
  }
};

// Get all faculty members
exports.getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find();
    
    res.status(200).json({
      success: true,
      count: faculty.length,
      data: faculty
    });
  } catch (error) {
    console.error('Error fetching faculty members:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching faculty members',
      error: error.message
    });
  }
};

// Assign student to faculty member
exports.assignStudent = async (req, res) => {
  try {
    const { facultyId, studentId } = req.params;
    
    // Check if faculty exists
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }
    
    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Check if student is already assigned to this faculty
    if (faculty.assignedStudents.includes(studentId)) {
      return res.status(400).json({
        success: false,
        message: 'Student is already assigned to this faculty member'
      });
    }
    
    // Add student to faculty's assigned students
    faculty.assignedStudents.push(studentId);
    await faculty.save();
    
    // Update student's mentor
    student.mentor = facultyId;
    await student.save();
    
    res.status(200).json({
      success: true,
      message: 'Student assigned to faculty member successfully',
      data: {
        faculty,
        student
      }
    });
  } catch (error) {
    console.error('Error assigning student to faculty:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while assigning student to faculty',
      error: error.message
    });
  }
};

// Remove student from faculty member
exports.removeStudent = async (req, res) => {
  try {
    const { facultyId, studentId } = req.params;
    
    // Check if faculty exists
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty member not found'
      });
    }
    
    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }
    
    // Check if student is assigned to this faculty
    if (!faculty.assignedStudents.includes(studentId)) {
      return res.status(400).json({
        success: false,
        message: 'Student is not assigned to this faculty member'
      });
    }
    
    // Remove student from faculty's assigned students
    faculty.assignedStudents = faculty.assignedStudents.filter(
      id => id.toString() !== studentId
    );
    await faculty.save();
    
    // Remove mentor from student
    if (student.mentor && student.mentor.toString() === facultyId) {
      student.mentor = null;
      await student.save();
    }
    
    res.status(200).json({
      success: true,
      message: 'Student removed from faculty member successfully',
      data: {
        faculty,
        student
      }
    });
  } catch (error) {
    console.error('Error removing student from faculty:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing student from faculty',
      error: error.message
    });
  }
}; 