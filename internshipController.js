const Internship = require('../models/Internship');

// Get all internships
exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.status(200).json({
      success: true,
      count: internships.length,
      data: internships
    });
  } catch (error) {
    console.error('Error fetching internships:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching internships',
      error: error.message
    });
  }
};

// Create a new internship
exports.createInternship = async (req, res) => {
  try {
    const internship = new Internship(req.body);
    await internship.save();
    
    res.status(201).json({
      success: true,
      message: 'Internship created successfully',
      data: internship
    });
  } catch (error) {
    console.error('Error creating internship:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating internship',
      error: error.message
    });
  }
};

// Filter internships by department or sector
exports.filterInternships = async (req, res) => {
  try {
    const { department, sector, sdg, po, peo, isAvailable } = req.query;
    
    // Build filter object based on query parameters
    const filter = {};
    
    if (department) filter.department = department;
    if (sector) filter.sector = sector;
    if (sdg) filter.sdgs = sdg;
    if (po) filter.pos = po;
    if (peo) filter.peos = peo;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === 'true';
    
    const internships = await Internship.find(filter);
    
    res.status(200).json({
      success: true,
      count: internships.length,
      data: internships
    });
  } catch (error) {
    console.error('Error filtering internships:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while filtering internships',
      error: error.message
    });
  }
}; 