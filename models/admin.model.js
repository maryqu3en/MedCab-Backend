const prisma = require('../config/prisma');

exports.getDashboardData = async () => {
    const totalDoctors = await prisma.doctor.count();
    const totalStaff = await prisma.staff.count();
    const totalPatients = await prisma.patient.count();
    
    return {
        totalDoctors,
        totalStaff,
        totalPatients
    };
};