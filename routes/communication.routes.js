const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const communicationController = require('../controllers/communication.controller');

// Get communication logs by room ID
router.get('/:roomId/logs', authenticate, communicationController.getLogsByRoomId);

module.exports = router;