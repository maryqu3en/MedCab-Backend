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

exports.getPatientById = async (id) => {
  return await prisma.patient.findUnique({
    where: { id },
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
  return await prisma.patient.delete({
    where: { id },
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