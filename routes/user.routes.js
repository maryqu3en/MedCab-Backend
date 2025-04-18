const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.post('/logout', authenticate, userController.logout);
router.get('/profile', authenticate, userController.getProfile);

router.get('/users', authenticate, authorize('admin'), userController.getUsers);
router.get('/users/:id', authenticate, authorize('admin'), userController.getUserById);
router.put('/users/:id', authenticate, authorize('admin'), userController.updateUser);
router.delete('/users/:id', authenticate, authorize('admin'), userController.deleteUser);

module.exports = router;
