const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/authorize.middleware');
const fieldValidator = require('../middleware/validateFields');
const userController = require('../controllers/user.controller');

router.post('/register', fieldValidator.registerRules, fieldValidator.validate, userController.register);
router.post('/login', fieldValidator.loginRules, fieldValidator.validate, userController.login);
router.get('/verify-token', userController.verifyToken);

router.get('/logout', authenticate, userController.logout);
router.get('/profile', authenticate, userController.getProfile);

router.get('/users', authenticate, authorize('admin'), userController.getUsers);
router.get('/doctors', authenticate, authorize('admin'), userController.getDoctors);
router.get('/staff', authenticate, authorize('admin'), userController.getStaff);
router.get('/:id', authenticate, authorize('admin'), userController.getUserById);
router.put('/:id', authenticate, authorize('admin'), userController.updateUser);
router.put('/profile/:id', authenticate, userController.updateUserProfile);
router.delete('/:id', authenticate, authorize('admin'), userController.deleteUser);

module.exports = router;

// Swagger documentation
/**
 * @swagger
 * paths:
 *   /api/user/register:
 *     post:
 *       summary: Register a new user
 *       tags:
 *         - Users
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 password:
 *                   type: string
 *                   example: password123
 *                 usertype:
 *                   type: string
 *                   enum: [doctor, staff, admin]
 *                   example: doctor
 *                 phone:
 *                   type: string
 *                   example: 123456789
 *                 specialty:
 *                   type: string
 *                   example: Cardiology
 *                 role:
 *                   type: string
 *                   example: nurse
 *       responses:
 *         201:
 *           description: User registered successfully
 *         400:
 *           description: Validation error
 *         500:
 *           description: Internal server error
 *   /api/user/login:
 *     post:
 *       summary: Log in a user
 *       tags:
 *         - Users
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 password:
 *                   type: string
 *                   example: password123
 *       responses:
 *         200:
 *           description: Login successful
 *         401:
 *           description: Invalid credentials
 *         500:
 *           description: Internal server error
 *   /api/user/logout:
 *     get:
 *       summary: Log out the current user
 *       tags:
 *         - Users
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Logout successful
 *         401:
 *           description: Unauthorized
 *         500:
 *           description: Internal server error
 *   /api/user/profile:
 *     get:
 *       summary: Get the profile of the currently authenticated user
 *       tags:
 *         - Users
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: User profile retrieved successfully
 *         401:
 *           description: Unauthorized
 *         500:
 *           description: Internal server error
 *   /api/user/users:
 *     get:
 *       summary: Get all users
 *       tags:
 *         - Users
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of users retrieved successfully
 *         403:
 *           description: Forbidden
 *         500:
 *           description: Internal server error
 *   /api/user/doctors:
 *     get:
 *       summary: Get all doctors
 *       tags:
 *         - Users
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of doctors retrieved successfully
 *         403:
 *           description: Forbidden
 *         500:
 *           description: Internal server error
 *   /api/user/staff:
 *     get:
 *       summary: Get all staff
 *       tags:
 *         - Users
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: List of staff retrieved successfully
 *         403:
 *           description: Forbidden
 *         500:
 *           description: Internal server error
 *   /api/user/{id}:
 *     get:
 *       summary: Get a user by ID
 *       tags:
 *         - Users
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the user to retrieve
 *       responses:
 *         200:
 *           description: User retrieved successfully
 *         404:
 *           description: User not found
 *         500:
 *           description: Internal server error
 *     put:
 *       summary: Update a user by ID
 *       tags:
 *         - Users
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the user to update
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 password:
 *                   type: string
 *                   example: newpassword123
 *       responses:
 *         200:
 *           description: User updated successfully
 *         404:
 *           description: User not found
 *         500:
 *           description: Internal server error
 *     delete:
 *       summary: Soft delete a user by ID
 *       tags:
 *         - Users
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the user to delete
 *       responses:
 *         200:
 *           description: User deleted successfully
 *         404:
 *           description: User not found
 *         500:
 *           description: Internal server error
 *   /api/user/profile/{id}:
 *     put:
 *       summary: Update the profile of the currently authenticated user
 *       tags:
 *         - Users
 *       security:
 *         - bearerAuth: []
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           schema:
 *             type: string
 *           description: ID of the user to update
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *                 password:
 *                   type: string
 *                   example: newpassword123
 *       responses:
 *         200:
 *           description: User profile updated successfully
 *         404:
 *           description: User not found
 *         500:
 *           description: Internal server error
 *   /api/user/verify-token:
 *     get:
 *       summary: Verify a user's token
 *       tags:
 *         - Users
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         200:
 *           description: Token is valid
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Token is valid
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: user-id-123
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john.doe@example.com
 *                       user_type:
 *                         type: string
 *                         example: doctor
 *         401:
 *           description: Unauthorized (invalid or missing token)
 *         500:
 *           description: Internal server error
 * 
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

