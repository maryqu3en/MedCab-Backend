const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');
const fieldValidator = require('../middleware/validateFields');
const adminController = require('../controllers/admin.controller');


router.patch("/users/status/:id", authenticate, authorize("admin"), adminController.updateUserStatus);
router.get("/dashboard",authenticate, authorize("admin"), adminController.getAdminDashboard);
module.exports = router;