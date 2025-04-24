const express = require('express');
const router = express.Router();
const { 
  getAllInternships, 
  createInternship, 
  filterInternships 
} = require('../controllers/internshipController');

// GET /api/internships - Get all internships
router.get('/', getAllInternships);

// GET /api/internships/filter - Filter internships by various criteria
router.get('/filter', filterInternships);

// POST /api/internships - Create a new internship
router.post('/', createInternship);

module.exports = router; 