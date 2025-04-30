const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');
const fieldValidator = require('../middleware/validateFields');
const adminController = require('../controllers/admin.controller');

router.patch("/status/:id", authenticate, authorize("admin"), adminController.updateUserStatus);
router.get("/dashboard", authenticate, authorize("admin"), adminController.getAdminDashboard);

module.exports = router;

// swagger documentation
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
 * 
 *     responses:
 *       200:
 *         description: User status updated successfully
 */
/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard data
 *     tags: [Admin]
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
 *                 totalPatients:
 *                   type: integer
 *                 totalDoctors:
 *                   type: integer
 */