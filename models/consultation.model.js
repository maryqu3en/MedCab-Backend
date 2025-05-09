const prisma = require('../config/prisma');

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

exports.searchConsultationsByDate = async (date) => {
    return await prisma.consultationSession.findMany({
        where: {
            createdAt: {
                gte: new Date(date + 'T00:00:00Z'), // Start of the day
                lt: new Date(date + 'T23:59:59Z'),  // End of the day
            },
        },
        include: {
            MedicalRecord: {
                include: {
                    Patient: true, // Include patient details
                },
            },
        },
    });
};

exports.searchConsultationsByPatientName = async (name) => {
    return await prisma.consultationSession.findMany({
        where: {
            MedicalRecord: {
                Patient: {
                    name: {
                        contains: name,
                        mode: 'insensitive', // Case-insensitive search
                    },
                },
            },
        },
        include: {
            MedicalRecord: {
                include: {
                    Patient: true, // Include patient details
                },
            },
        },
    });
};

// Get all consultations
exports.getAllConsultations = async () => {
    return await prisma.consultationSession.findMany({
        include: {
            MedicalRecord: {
                include: {
                    Patient: true, // Include patient details
                    Doctor: {
                        include: {
                            User: true, // Include doctor user details
                        },
                    },
                },
            },
            complementaryExams: true, // Include complementary exams
        },
        orderBy: {
            createdAt: 'desc', // Order by most recent consultations
        },
    });
};

// Get all consultations for a specific doctor
exports.getConsultationsByDoctorId = async (doctorId) => {
    return await prisma.consultationSession.findMany({
        where: {
            MedicalRecord: {
                created_by: doctorId, // Filter by doctor ID
            },
        },
        include: {
            MedicalRecord: {
                include: {
                    Patient: true, // Include patient details
                },
            },
            complementaryExams: true, // Include complementary exams
        },
        orderBy: {
            createdAt: 'desc', // Order by most recent consultations
        },
    });
};

