const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     tags: [Utility]
 *     responses:
 *       200:
 *         description: Server is healthy
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running ✅',
    timestamp: new Date(),
  });
});

module.exports = router;
