const userModel = require('../models/user.model');
const { verifyToken } = require('../utils/jwt.utils');

exports.login = async (req, res) => {
    try {
        const result = await userModel.login(req.body);
        res.status(200).json(result);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

exports.register = async (req, res) => {
    try {
        const result = await userModel.register(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};


exports.verifyToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Extract the token from the Authorization header
        if (!token) {
            return res.status(401).json({ message: 'Token is required' });
        }

        const decoded = verifyToken(token);

        const user = await userModel.getUserById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let status = null;
        if (user.user_type === 'doctor') {
            const doctor = await userModel.getDoctorById(user.id);
            status = doctor?.status || null;
        } else if (user.user_type === 'staff') {
            const staff = await userModel.getStaffById(user.id);
            status = staff?.status || null;
        }

        res.status(200).json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                user_type: user.user_type,
                status,
                created_at: user.createdAt,
                updated_at: user.updatedAt,
            },
        });
    } catch (error) {
        console.error('Error verifying token:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired' });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(500).json({ message: 'Failed to verify token', error: error.message });
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

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

exports.getDoctors = async (req, res) => {
    try {
        const doctors = await userModel.getAllDoctors();
        res.status(200).json(doctors);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
}

exports.getStaff = async (req, res) => {
    try {
        const staff = await userModel.getAllStaff();
        res.status(200).json(staff);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updatedUser = await userModel.updateUser(req.params.id, req.body);
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    const userId = req.user.id;
    const data = req.body;

    try {
        const updatedUser = await userModel.updateUserProfile(userId, data);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(error.status || 500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(err.status || 500).json({ message: err.message });
    }
};
