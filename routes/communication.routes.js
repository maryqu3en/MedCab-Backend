const express = require('express');
const router = express.Router();
const { getMessages, postMessage } = require('../controllers/communication.controller');
const authenticate = require('../middleware/auth.middleware');

router.get('/:roomId', authenticate, getMessages);
router.post('/', authenticate, postMessage);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Communication
 *   description: Communication related endpoints
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * security:
 *   - bearerAuth: []
 * /api/communications/{roomId}:
 *   get:
 *     summary: Get all messages for a specific room
 *     tags: [Communication]
 *     security:
 *       - bearerAuth: [] # Require Bearer Token Authentication
 *     parameters:
 *       - in: path
 *         name: roomId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the room
 *     responses:
 *       200:
 *         description: A list of messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The message ID
 *                   roomId:
 *                     type: string
 *                     description: The room ID
 *                   senderId:
 *                     type: string
 *                     description: The sender's user ID
 *                   message:
 *                     type: string
 *                     description: The message content
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The timestamp of the message
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Failed to get messages
 * /api/communications:
 *   post:
 *     summary: Send a new message to a room
 *     tags: [Communication]
 *     security:
 *       - bearerAuth: [] # Require Bearer Token Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomId:
 *                 type: string
 *                 description: The ID of the room
 *               senderId:
 *                 type: string
 *                 description: The sender's user ID
 *               message:
 *                 type: string
 *                 description: The message content
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The message ID
 *                 roomId:
 *                   type: string
 *                   description: The room ID
 *                 senderId:
 *                   type: string
 *                   description: The sender's user ID
 *                 message:
 *                   type: string
 *                   description: The message content
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The timestamp of the message
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Failed to send message
 */

