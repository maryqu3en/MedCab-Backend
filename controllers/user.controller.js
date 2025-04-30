const userModel = require('../models/user.model');

exports.register = async (req, res) => {
    try {
        const result = await userModel.register(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await userModel.login(req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(400).json({ message: 'Token required' });

        await userModel.logout(token);
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const userProfile = await userModel.getUserProfile(req.user.id);
        res.status(200).json(userProfile);
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(err.status || 500).json({ message: err.message });
    }
};
// GET /users
exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

// GET /users/:id
exports.getUserById = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

// PUT /users/:id
exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

// DELETE /users/:id
exports.deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};
