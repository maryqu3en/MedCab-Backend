const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const secret = process.env.JWT_SECRET;

const generateToken = async (user, userType) => {
    const payload = {
        id: user.ID,
        email: user.Email,
        type: userType,
    };

    const token = jwt.sign(payload, secret, { expiresIn: '10d' });
    const expiresAt = new Date(Date.now() + 10 * 24 * 3600 * 1000);

    await Token.create({
        RefreshToken: token,
        ExpiresAt: expiresAt,
        AdminID: userType === 'Admin' ? user.ID : null,
        DoctorID: userType === 'Doctor' ? user.ID : null,
    });

    return token;
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
};

const deleteToken = async (token) => {
    await Token.destroy({ where: { RefreshToken: token } });
};

module.exports = { generateToken, verifyToken, deleteToken };
