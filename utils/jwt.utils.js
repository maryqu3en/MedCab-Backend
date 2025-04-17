const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const secret = process.env.JWT_SECRET;

const tokenExpiryDays = 10;


const generateToken = async (user) => {
    const payload = {
        id: user.ID,
        email: user.Email,
        type: user.UserType,
    };

    const token = jwt.sign(payload, secret, { expiresIn: `${tokenExpiryDays}d` });
    const expiresAt = new Date(Date.now() + tokenExpiryDays * 24 * 3600 * 1000);

    await Token.create({
        RefreshToken: token,
        ExpiresAt: expiresAt,
        UserID: user.ID,
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
