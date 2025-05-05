const express = require('express');
const {
  createPatient,
  getPatient,
  updatePatient,
  deletePatient,
  getPatientRecords,
  getAllPatients,
  searchPatientsByName,
} = require('../controllers/patient.controller');

const authenticate = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/', authenticate, createPatient);
router.get('/', authenticate, getAllPatients);
router.get('/search', authenticate, searchPatientsByName);
router.get('/:id', getPatient);
router.put('/:id', updatePatient);
router.delete('/:id', deletePatient);
router.get('/:id/records', getPatientRecords);

module.exports = router;

// Swagger documentation
/**
 * @swagger
 * paths:
 *   /api/patients:
 *     post:
 *       summary: Create a new patient
 *       tags:
 *         - Patients
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 birth_date:
 *                   type: string
 *                   format: date
 *                   example: "1990-01-01"
 *                 gender:
 *                   type: string
 *                   enum: [male, female]
 *                   example: male
 *       responses:
 *         201:
 *           description: Patient created successfully
 *         400:
 *           description: Validation error
 *         500:
 *           description: Internal server error
 *     get:
 *       summary: Get all patients
 *       tags:
 *         - Patients
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of patients retrieved successfully
 *         500:
 *           description: Internal server error
 *   /api/patients/search:
 *     get:
 *       summary: Search patients by name
 *       tags:
 *         - Patients
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: name
 *           in: query
 *           required: true
 *           schema:
 *             type: string
 *           description: Name of the patient to search
 *       responses:
 *         200:
 *           description: List of matching patients retrieved successfully
 *         404:
 *           description: No matching patients found
 *         500:
 *           description: Internal server error
 *   /api/patients/{id}:
 *     get:
 *       summary: Get a patient by ID
 *       tags:
 *         - Patients
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the patient
 *       responses:
 *         200:
 *           description: Patient retrieved successfully
 *         404:
 *           description: Patient not found
 *         500:
 *           description: Internal server error
 *     put:
 *       summary: Update a patient by ID
 *       tags:
 *         - Patients
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the patient
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 birth_date:
 *                   type: string
 *                   format: date
 *                   example: "1990-01-01"
 *                 gender:
 *                   type: string
 *                   enum: [male, female]
 *                   example: male
 *       responses:
 *         200:
 *           description: Patient updated successfully
 *         404:
 *           description: Patient not found
 *         500:
 *           description: Internal server error
 *     delete:
 *       summary: Delete a patient by ID
 *       tags:
 *         - Patients
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the patient
 *       responses:
 *         200:
 *           description: Patient deleted successfully
 *         404:
 *           description: Patient not found
 *         500:
 *           description: Internal server error
 *   /api/patients/{id}/records:
 *     get:
 *       summary: Get medical records of a patient
 *       tags:
 *         - Patients
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the patient
 *       responses:
 *         200:
 *           description: Medical records retrieved successfully
 *         404:
 *           description: Patient not found
 *         500:
 *           description: Internal server error
 */