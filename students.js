const express = require('express');
const router = express.Router();
const {
  createStudent,
  getStudentById,
  applyForInternship,
  updateApplicationStatus,
  assignMentor
} = require('../controllers/studentController');

// Create a new student
router.post('/', createStudent);

// Get student by ID
router.get('/:id', getStudentById);

// Apply for an internship
router.post('/:studentId/internships/:internshipId/apply', applyForInternship);

// Update application status
router.patch('/:studentId/internships/:internshipId/status', updateApplicationStatus);

// Assign mentor to student
router.patch('/:studentId/mentor', assignMentor);

module.exports = router; 