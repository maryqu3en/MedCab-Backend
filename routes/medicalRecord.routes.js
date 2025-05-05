const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const medicalRecordController = require('../controllers/medicalRecord.controller');

router.post('/:medicalRecordId/consultations', authenticate, medicalRecordController.addConsultation);

router.put('/:medicalRecordId', authenticate, medicalRecordController.updateMedicalRecord);

router.get('/:medicalRecordId', authenticate, medicalRecordController.getMedicalRecordById);

module.exports = router;

// Swagger documentation for medical records API
/**
 * @swagger
 * paths:
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

