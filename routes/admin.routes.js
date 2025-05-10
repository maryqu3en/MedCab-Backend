const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');
const fieldValidator = require('../middleware/validateFields');
const adminController = require('../controllers/admin.controller');

router.patch("/status/:id", authenticate, authorize("admin"), adminController.updateUserStatus);
router.get("/dashboard", authenticate, authorize("admin"), adminController.getAdminDashboard);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */
/**
 * @swagger
 * /api/admin/status/{id}:
 *   patch:
 *     summary: Update user status
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: [] # Requires Authorization header with Bearer token
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [active, inactive, pending]
 *               usertype: 
 *                 type: string
 *                 enum: [staff, doctor]
 *     responses:
 *       200:
 *         description: User status updated successfully
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       403:
 *         description: Forbidden - User is not authorized
 */
/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: [] # Requires Authorization header with Bearer token
 *     responses:
 *       200:
 *         description: Admin dashboard data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalStaff:
 *                   type: integer
 *                   example: 10
 *                 totalPatients:
 *                   type: integer
 *                   example: 50
 *                 totalDoctors:
 *                   type: integer
 *                   example: 20
 *       401:
 *         description: Unauthorized - Token is missing or invalid
 *       403:
 *         description: Forbidden - User is not authorized
 */