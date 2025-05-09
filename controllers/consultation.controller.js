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

// Search consultations by date
exports.searchConsultationsByDate = async (req, res) => {
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ message: 'Date query parameter is required' });
    }

    try {
        const consultations = await consultationModel.searchConsultationsByDate(date);
        res.status(200).json(consultations);
    } catch (error) {
        console.error('Error searching consultations by date:', error);
        res.status(500).json({ message: 'Failed to search consultations by date', error: error.message });
    }
};

// Search consultations by patient name
exports.searchConsultationsByPatientName = async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ message: 'Name query parameter is required' });
    }

    try {
        const consultations = await consultationModel.searchConsultationsByPatientName(name);
        res.status(200).json(consultations);
    } catch (error) {
        console.error('Error searching consultations by patient name:', error);
        res.status(500).json({ message: 'Failed to search consultations by patient name', error: error.message });
    }
};

// Get all consultations
exports.getAllConsultations = async (req, res) => {
    try {
        const consultations = await consultationModel.getAllConsultations();
        res.status(200).json(consultations);
    } catch (error) {
        console.error('Error fetching all consultations:', error);
        res.status(500).json({ message: 'Failed to fetch consultations', error: error.message });
    }
};

// Get consultations for a specific doctor
exports.getConsultationsByDoctorId = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const consultations = await consultationModel.getConsultationsByDoctorId(doctorId);
        res.status(200).json(consultations);
    } catch (error) {
        console.error('Error fetching consultations for doctor:', error);
        res.status(500).json({ message: 'Failed to fetch consultations for doctor', error: error.message });
    }
};

