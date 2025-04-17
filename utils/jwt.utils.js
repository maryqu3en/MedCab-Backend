const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const secret = process.env.JWT_SECRET;

const tokenExpiryDays = 10;


const generateToken = async (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        type: user.usertype,
    };

    const token = jwt.sign(payload, secret, { expiresIn: `${tokenExpiryDays}d` });
    const expires_at = new Date(Date.now() + tokenExpiryDays * 24 * 3600 * 1000);

    await Token.create({
        refresh_token: token,
        expires_at: expires_at,
        user_id: user.id,
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
    await Token.destroy({ where: { refresh_token: token } });
};

module.exports = { generateToken, verifyToken, deleteToken };
