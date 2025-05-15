const prisma = require('../config/prisma');

exports.getMessagesByRoomId = async (roomId) => {
  return await prisma.communicationLog.findMany({
    where: { roomId },
    orderBy: { createdAt: 'asc' },
  });
};

exports.createMessage = async (roomId, senderId, message) => {
  return await prisma.communicationLog.create({
    data: { roomId, senderId, message, createdAt: new Date() },
  });
};