const { verifyToken, getTokenFromHeader } = require('../utils/jwt.utils');
const prisma = require('../config/prisma');

const auth = async (req, res, next) => {
  const token = getTokenFromHeader(req);

  if (!token) {
    return res.status(401).json({ error: 'Authorization token is missing or invalid' });
  }

  try {
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    const user = await prisma.user.findFirst({
      where: {
        id: decoded.id,
        deletedAt: null,
      },
    });

    const tokenRecord = await prisma.token.findFirst({
      where: {
        refresh_token: token,
        user_id: decoded.id,
      },
    });

    if (!user || !tokenRecord) {
      return res.status(401).json({ error: 'Unauthorized or token not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = auth;
