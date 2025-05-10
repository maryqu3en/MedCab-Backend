const medicalRecordModel = require('../models/medicalRecord.model');

exports.addConsultation = async (req, res) => {
    const { medicalRecordId } = req.params;
    const consultationData = req.body;

    try {
        const consultation = await medicalRecordModel.addConsultation(medicalRecordId, consultationData);
        res.status(201).json({
            message: 'Consultation added successfully',
            consultation,
        });
    } catch (error) {
        console.error('Error adding consultation:', error);
        res.status(500).json({ message: 'Failed to add consultation', error: error.message });
    }
};

// Update a medical record
exports.updateMedicalRecord = async (req, res) => {
    const { medicalRecordId } = req.params;
    const updateData = req.body;

    try {
        const updatedRecord = await medicalRecordModel.updateMedicalRecord(medicalRecordId, updateData);
        res.status(200).json({
            message: 'Medical record updated successfully',
            updatedRecord,
        });
    } catch (error) {
        console.error('Error updating medical record:', error);
        res.status(500).json({ message: 'Failed to update medical record', error: error.message });
    }
};

// Get a medical record by ID (optional helper)
exports.getMedicalRecordById = async (req, res) => {
    const { medicalRecordId } = req.params;

    try {
        const medicalRecord = await medicalRecordModel.getMedicalRecordById(medicalRecordId);
        if (!medicalRecord) {
            return res.status(404).json({ message: 'Medical record not found' });
        }
        res.status(200).json(medicalRecord);
    } catch (error) {
        console.error('Error fetching medical record:', error);
        res.status(500).json({ message: 'Failed to fetch medical record', error: error.message });
    }
};

// Fetch all medical records
exports.getAllMedicalRecords = async (req, res) => {
    try {
        const records = await medicalRecordModel.getAllMedicalRecords();
        res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching all medical records:', error);
        res.status(500).json({ message: 'Failed to fetch medical records', error: error.message });
    }
};

// Fetch all medical records for a specific doctor
exports.getMedicalRecordsByDoctorId = async (req, res) => {
    const { doctorId } = req.params;

    try {
        const records = await medicalRecordModel.getMedicalRecordsByDoctorId(doctorId);
        res.status(200).json(records);
    } catch (error) {
        console.error('Error fetching medical records for doctor:', error);
        res.status(500).json({ message: 'Failed to fetch medical records for doctor', error: error.message });
    }
};

// Search medical records by patient name
exports.searchMedicalRecordsByPatientName = async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ message: 'Name query parameter is required' });
    }

    try {
        const records = await medicalRecordModel.searchMedicalRecordsByPatientName(name);
        res.status(200).json(records);
    } catch (error) {
        console.error('Error searching medical records by patient name:', error);
        res.status(500).json({ message: 'Failed to search medical records', error: error.message });
    }
};