const jwt = require('jsonwebtoken');
const prisma = require('../config/prisma');


const secret = process.env.JWT_SECRET;
const tokenExpiryDays = 10;

const generateToken = async (user) => {
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

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

const deleteToken = async (token) => {
  await prisma.token.deleteMany({
    where: { refresh_token: token },
  });
};

module.exports = {
  generateToken,
  verifyToken,
  deleteToken,
};
