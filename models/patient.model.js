const prisma = require('../config/prisma');

exports.createPatient = async (data) => {
  return await prisma.patient.create({
    data,
  });
};

exports.getPatientById = async (id) => {
  return await prisma.patient.findUnique({
    where: { id },
  });
};

exports.updatePatient = async (id, data) => {
  return await prisma.patient.update({
    where: { id },
    data,
  });
};

exports.deletePatient = async (id) => {
  return await prisma.patient.delete({
    where: { id },
  });
};

exports.getPatientRecords = async (patientId) => {
  return await prisma.medicalRecord.findMany({
    where: { patientId },
    include: {
      consultations: true, // Include consultations for each medical record
    },
  });
};