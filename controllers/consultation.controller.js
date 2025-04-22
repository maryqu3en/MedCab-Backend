const prisma = require('../config/prisma');

const ConsultationSession = prisma.consultationSession;
const ComplementaryExam = prisma.complementaryExam;

exports.createConsultation = async (req, res) => {
  try {
    const {
      medicalRecordId,
      antecedentsPersonnels,
      antecedentsFamiliaux,
      hdmSymptoms,
      clinicalExam,
      diagnosis,
      treatments,
      complementaryExams = [],
    } = req.body;

    const session = await ConsultationSession.create({
      medicalRecordId,
      antecedentsPersonnels,
      antecedentsFamiliaux,
      hdmSymptoms,
      clinicalExam,
      diagnosis,
      treatments
    });

    if (complementaryExams.length) {
      const examsToCreate = complementaryExams.map(exam => ({
        ...exam,
        consultationSessionId: session.id
      }));

      await ComplementaryExam.bulkCreate(examsToCreate);
    }

    res.status(201).json({ message: 'Consultation created', sessionId: session.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create consultation', error: err.message });
  }
};
