const prisma = require('../config/prisma');

exports.createLog = async (roomId, senderId, message) => {
    return await prisma.communicationLog.create({
        data: {
            roomId,
            senderId,
            message,
        },
    });
};

exports.getLogsByRoomId = async (roomId) => {
    return await prisma.communicationLog.findMany({
        where: { roomId },
        orderBy: { createdAt: 'asc' },
    });
};