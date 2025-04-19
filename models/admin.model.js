const prisma = require('../config/prisma');

exports.updateDoctorStatus = async (id, status, adminId) => {
    const updated = await prisma.doctor.updateMany({
        where: { id },
        data: { status, created_by: adminId }
    });

    return updated.count > 0;
};

exports.updateStaffStatus = async (id, status, adminId) => {
    const updated = await prisma.staff.updateMany({
        where: { id },
        data: { status, created_by: adminId }
    });

    return updated.count > 0;
};
