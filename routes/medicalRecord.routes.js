const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const medicalRecordController = require('../controllers/medicalRecord.controller');

router.get('/', authenticate, medicalRecordController.getAllMedicalRecords);

router.get('/doctor/:doctorId', authenticate, medicalRecordController.getMedicalRecordsByDoctorId);

router.get('/search', authenticate, medicalRecordController.searchMedicalRecordsByPatientName);

router.post('/:medicalRecordId/consultations', authenticate, medicalRecordController.addConsultation);

router.put('/:medicalRecordId', authenticate, medicalRecordController.updateMedicalRecord);

router.get('/:medicalRecordId', authenticate, medicalRecordController.getMedicalRecordById);

module.exports = router;

// Swagger documentation for medical records API
/**
 * @swagger
 * paths:
 *   /api/medical-records:
 *     get:
 *       summary: Fetch all medical records
 *       tags:
 *         - Medical Records
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of all medical records retrieved successfully
 *         500:
 *           description: Internal server error
 *   /api/medical-records/doctor/{doctorId}:
 *     get:
 *       summary: Fetch all medical records for a specific doctor
 *       tags:
 *         - Medical Records
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
 *           description: List of medical records for the doctor retrieved successfully
 *         404:
 *           description: Doctor not found
 *         500:
 *           description: Internal server error
 *   /api/medical-records/search:
 *     get:
 *       summary: Search medical records by patient name
 *       tags:
 *         - Medical Records
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: patientName
 *           in: query
 *           required: true
 *           schema:
 *             type: string
 *           description: Name of the patient to search for
 *       responses:
 *         200:
 *           description: List of medical records matching the patient name retrieved successfully
 *         404:
 *           description: No medical records found for the given patient name
 *         500:
 *           description: Internal server error
 *   /api/medical-records/{medicalRecordId}/consultations:
 *     post:
 *       summary: Add a consultation to a medical record
 *       tags:
 *         - Medical Records
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
 *           description: Consultation added successfully
 *         404:
 *           description: Medical record not found
 *         500:
 *           description: Internal server error
 *   /api/medical-records/{medicalRecordId}:
 *     put:
 *       summary: Update a medical record
 *       tags:
 *         - Medical Records
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
 *                 created_by:
 *                   type: string
 *                   example: "doctor-id-123"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-05-04T12:00:00Z"
 *       responses:
 *         200:
 *           description: Medical record updated successfully
 *         404:
 *           description: Medical record not found
 *         500:
 *           description: Internal server error
 *     get:
 *       summary: Get a medical record by ID
 *       tags:
 *         - Medical Records
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
 *           description: Medical record retrieved successfully
 *         404:
 *           description: Medical record not found
 *         500:
 *           description: Internal server error
 */

