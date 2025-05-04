const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const consultationController = require('../controllers/consultation.controller');

// Create a new consultation
router.post('/:medicalRecordId', authenticate, consultationController.createConsultation);

// Get all consultations for a medical record
router.get('/:medicalRecordId', authenticate, consultationController.getConsultationsByMedicalRecordId);

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
 */

