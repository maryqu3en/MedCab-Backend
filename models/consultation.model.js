const prisma = require('../config/prisma');

// Create a new consultation
exports.createConsultation = async (medicalRecordId, consultationData) => {
    return await prisma.consultationSession.create({
        data: {
            medicalRecordId,
            ...consultationData,
        },
    });
};

exports.getConsultationsByMedicalRecordId = async (medicalRecordId) => {
    return await prisma.consultationSession.findMany({
        where: { medicalRecordId },
        include: {
            complementaryExams: true,
        },
    });
};