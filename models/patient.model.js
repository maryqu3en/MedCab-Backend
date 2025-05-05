const prisma = require('../config/prisma');

exports.createPatient = async (data, doctorId) => {
  const patient = await prisma.patient.create({
    data,
  });

  const medicalRecord = await prisma.medicalRecord.create({
    data: {
      patient_id: patient.id,
      created_by: doctorId,
      consultations: {
        create: [],
      },
    },
  });

  return { ...patient, medicalRecord };
};

exports.getAllPatients = async (userId, userType) => {
  if (userType === 'doctor') {
    return await prisma.patient.findMany({
      where: {
        deletedAt: null,
        MedicalRecords: {
          some: {
            created_by: userId,
          },
        },
      },
      include: {
        MedicalRecords: true,
      },
    });
  } else if (userType === 'admin') {
    return await prisma.patient.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        MedicalRecords: true,
      },
    });
  }
};

exports.getPatientById = async (id) => {
  return await prisma.patient.findUnique({
    where: { id, deletedAt: null },
    include: {
      MedicalRecords: true,
    },
  });
};

exports.updatePatient = async (id, data) => {
  return await prisma.patient.update({
    where: { id },
    data,
  });
};

exports.deletePatient = async (id) => {
  return await prisma.patient.update({
    where: { id },
    data: {
      deleted_at: new Date(),
    },
  });
};

exports.getPatientRecords = async (patientId) => {
  return await prisma.medicalRecord.findMany({
    where: { patient_id: patientId },
    include: {
      consultations: true,
    },
  });
};

exports.searchPatientsByName = async (name) => {
  return await prisma.patient.findMany({
    where: {
      deletedAt: null,
      name: {
        contains: name,
        mode: 'insensitive',
      },
    },
  });
};