const prisma = require('../config/prisma');

// Add a consultation to a medical record
exports.addConsultation = async (medicalRecordId, consultationData) => {
    return await prisma.consultationSession.create({
        data: {
            medicalRecordId,
            ...consultationData,
        },
    });
};

// Update a medical record
exports.updateMedicalRecord = async (medicalRecordId, updateData) => {
    return await prisma.medicalRecord.update({
        where: { id: medicalRecordId },
        data: updateData,
    });
};

// Get a medical record by ID (optional helper)
exports.getMedicalRecordById = async (medicalRecordId) => {
    return await prisma.medicalRecord.findUnique({
        where: { id: medicalRecordId },
        include: {
            consultations: true, // Include consultations for the medical record
        },
    });
};