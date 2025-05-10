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

// Fetch all medical records
exports.getAllMedicalRecords = async () => {
    return await prisma.medicalRecord.findMany({
        include: {
            Patient: true, // Include patient details
            Doctor: {
                include: {
                    User: true, // Include doctor user details
                },
            },
        },
        orderBy: {
            createdAt: 'desc', // Order by most recent records
        },
    });
};

// Fetch all medical records for a specific doctor
exports.getMedicalRecordsByDoctorId = async (doctorId) => {
    return await prisma.medicalRecord.findMany({
        where: {
            created_by: doctorId, // Filter by doctor ID
        },
        include: {
            Patient: true, // Include patient details
        },
        orderBy: {
            createdAt: 'desc', // Order by most recent records
        },
    });
};

// Search medical records by patient name
exports.searchMedicalRecordsByPatientName = async (name) => {
    return await prisma.medicalRecord.findMany({
        where: {
            Patient: {
                name: {
                    contains: name,
                    mode: 'insensitive', // Case-insensitive search
                },
            },
        },
        include: {
            Patient: true, // Include patient details
            Doctor: {
                include: {
                    User: true, // Include doctor user details
                },
            },
        },
        orderBy: {
            createdAt: 'desc', // Order by most recent records
        },
    });
};