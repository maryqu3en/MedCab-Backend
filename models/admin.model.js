const prisma = require('../config/prisma');

exports.getDashboardData = async () => {
    const totalDoctors = await prisma.doctor.count();
    const totalStaff = await prisma.staff.count();
    const totalPatients = await prisma.patient.count();
    const totalMedicalRecords = await prisma.medicalRecord.count();
    const totalConsultations = await prisma.consultationSession.count();
    
    return {
        totalDoctors,
        totalStaff,
        totalPatients,
        totalMedicalRecords,
        totalConsultations
    };
};