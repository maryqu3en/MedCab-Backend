const express = require('express');
const {
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
  getPatientRecords,
  getAllPatients,
} = require('../controllers/patient.controller');

const authenticate = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', authenticate, createPatient);
router.get('/', authenticate, getAllPatients);
router.get('/:id', getPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);
router.get('/:id/records', getPatientRecords);

module.exports = router;