const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const consultationController = require('../controllers/consultation.controller');

// Create a new consultation
router.post('/:medicalRecordId', authenticate, consultationController.createConsultation);

// Get all consultations for a medical record
router.get('/:medicalRecordId', authenticate, consultationController.getConsultationsByMedicalRecordId);

// Search consultations by date
router.get('/search-by-date', authenticate, consultationController.searchConsultationsByDate);

// Search consultations by patient name
router.get('/search-by-name', authenticate, consultationController.searchConsultationsByPatientName);

// Get all consultations
router.get('/', authenticate, consultationController.getAllConsultations);

// Get consultations for a specific doctor
router.get('/doctor/:doctorId', authenticate, consultationController.getConsultationsByDoctorId);

module.exports = router;

// Swagger documentation
/**
 * @swagger
 * paths:
 *   /api/consultations/{medicalRecordId}:
 *     post:
 *       summary: Create a new consultation
 *       tags:
 *         - Consultations
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: medicalRecordId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the medical record
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 antecedentsPersonnels:
 *                   type: object
 *                   example: {}
 *                 antecedentsFamiliaux:
 *                   type: object
 *                   example: {}
 *                 hdmSymptoms:
 *                   type: object
 *                   example: {}
 *                 clinicalExam:
 *                   type: object
 *                   example: {}
 *                 diagnosis:
 *                   type: string
 *                   example: "Hypertension"
 *                 treatments:
 *                   type: string
 *                   example: "Prescribed medication"
 *       responses:
 *         201:
 *           description: Consultation created successfully
 *         500:
 *           description: Internal server error
 *     get:
 *       summary: Get all consultations for a medical record
 *       tags:
 *         - Consultations
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: medicalRecordId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the medical record
 *       responses:
 *         200:
 *           description: List of consultations retrieved successfully
 *         500:
 *           description: Internal server error
 *   /api/consultations/search-by-date:
 *     get:
 *       summary: Search consultations by date
 *       tags:
 *         - Consultations
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: date
 *           in: query
 *           required: true
 *           schema:
 *             type: string
 *             format: date
 *             example: "2023-05-06"
 *           description: Date to search consultations for
 *       responses:
 *         200:
 *           description: List of consultations on the specified date
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: consultation-id-123
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-05-06T10:00:00Z"
 *                     MedicalRecord:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: record-id-456
 *                         Patient:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: patient-id-789
 *                             name:
 *                               type: string
 *                               example: John Doe
 *         400:
 *           description: Date query parameter is required
 *         500:
 *           description: Internal server error
 *   /api/consultations/search-by-name:
 *     get:
 *       summary: Search consultations by patient name
 *       tags:
 *         - Consultations
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: name
 *           in: query
 *           required: true
 *           schema:
 *             type: string
 *             example: John
 *           description: Name or partial name of the patient to search for
 *       responses:
 *         200:
 *           description: List of consultations for patients matching the name
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: consultation-id-123
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-05-06T10:00:00Z"
 *                     MedicalRecord:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           example: record-id-456
 *                         Patient:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: patient-id-789
 *                             name:
 *                               type: string
 *                               example: John Doe
 *         400:
 *           description: Name query parameter is required
 *         500:
 *           description: Internal server error
 *   /api/consultations:
 *     get:
 *       summary: Get all consultations
 *       tags:
 *         - Consultations
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of all consultations retrieved successfully
 *         500:
 *           description: Internal server error
 *   /api/consultations/doctor/{doctorId}:
 *     get:
 *       summary: Get consultations for a specific doctor
 *       tags:
 *         - Consultations
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: doctorId
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the doctor
 *       responses:
 *         200:
 *           description: List of consultations for the specified doctor retrieved successfully
 *         500:
 *           description: Internal server error
 */

