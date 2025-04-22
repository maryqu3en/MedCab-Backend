const express = require('express');
const {
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
  getPatientRecords,
} = require('../controllers/patient.controller');

const router = express.Router();

router.post('/', createPatient); // Create a new patient
router.get('/:id', getPatient); // Get a patient by ID
router.put('/:id', updatePatient); // Update a patient by ID
router.delete('/:id', deletePatient); // Delete a patient by ID
router.get('/:id/records', getPatientRecords); // Get medical records for a patient

module.exports = router;