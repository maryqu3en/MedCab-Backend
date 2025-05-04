const consultationModel = require('../models/consultation.model');

// Create a new consultation
exports.createConsultation = async (req, res) => {
    const { medicalRecordId } = req.params;
    const consultationData = req.body;

    try {
        const consultation = await consultationModel.createConsultation(medicalRecordId, consultationData);
        res.status(201).json({
            message: 'Consultation created successfully',
            consultation,
        });
    } catch (error) {
        console.error('Error creating consultation:', error);
        res.status(500).json({ message: 'Failed to create consultation', error: error.message });
    }
};

// Get all consultations for a medical record
exports.getConsultationsByMedicalRecordId = async (req, res) => {
    const { medicalRecordId } = req.params;

    try {
        const consultations = await consultationModel.getConsultationsByMedicalRecordId(medicalRecordId);
        res.status(200).json(consultations);
    } catch (error) {
        console.error('Error fetching consultations:', error);
        res.status(500).json({ message: 'Failed to fetch consultations', error: error.message });
    }
};
