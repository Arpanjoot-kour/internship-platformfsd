const express = require('express');
const router = express.Router();
const {
  createFaculty,
  getFacultyById,
  getAllFaculty,
  assignStudent,
  removeStudent
} = require('../controllers/facultyController');
const { authenticateUser, checkRole } = require('../middleware/authMiddleware');

// All faculty routes require authentication
router.use(authenticateUser);

// Create a new faculty member (admin only)
router.post('/', checkRole(['admin']), createFaculty);

// Get all faculty members (admin and faculty)
router.get('/', checkRole(['admin', 'faculty']), getAllFaculty);

// Get faculty by ID (admin and faculty)
router.get('/:id', checkRole(['admin', 'faculty']), getFacultyById);

// Assign student to faculty member (admin only)
router.post('/:facultyId/students/:studentId', checkRole(['admin']), assignStudent);

// Remove student from faculty member (admin only)
router.delete('/:facultyId/students/:studentId', checkRole(['admin']), removeStudent);

module.exports = router; 