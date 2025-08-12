const express = require('express');
const router = express.Router();
const validateRegistration = require('../middleware/validateRegistration');
const { submitRegistration, getAllRegistrations } = require('../controllers/registrationController');

// POST with middleware
router.post('/submit', validateRegistration, submitRegistration);

// GET all records
router.get('/all', getAllRegistrations);

module.exports = router;