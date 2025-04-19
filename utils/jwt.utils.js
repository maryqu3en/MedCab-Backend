const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');


const secret = process.env.JWT_SECRET;
const tokenExpiryDays = 10;

exports.generateToken = async (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    type: user.user_type,
  };

  const token = jwt.sign(payload, secret, { expiresIn: `${tokenExpiryDays}d` });
  const expiresAt = new Date(Date.now() + tokenExpiryDays * 24 * 3600 * 1000);

  await prisma.token.create({
    data: {
      refresh_token: token,
      expires_at: expiresAt,
      User: {
        connect: { id: user.id },
      },
    },
  });

  return token;
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

exports.deleteToken = async (token) => {
  await prisma.token.deleteMany({
    where: { refresh_token: token },
  });
};

exports.decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

exports.getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  const token = authHeader.split(' ')[1];
  return token || null;
};