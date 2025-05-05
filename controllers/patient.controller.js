const { searchPatientsByName, getAllPatients, createPatient, getPatientById, updatePatient, deletePatient, getPatientRecords } = require('../models/patient.model');

exports.createPatient = async (req, res) => {
  const { name, birth_date, gender } = req.body;
  const doctorId = req.user.id;
  
  if (!birth_date || isNaN(new Date(birth_date).getTime())) {
    return res.status(400).json({ message: 'Invalid birth_date format' });
  }

  try {
    const patient = await createPatient(
      {
        name,
        birth_date: new Date(birth_date),
        gender,
      },
      doctorId 
    );
    res.status(201).json(patient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ message: 'Failed to create patient', error: error.message });
  }
};

exports.getAllPatients = async (req, res) => {
  const userId = req.user.id;
  const userType = req.user.user_type;

  try {
    const patients = await getAllPatients(userId, userType);
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Failed to fetch patients', error: error.message });
  }
};

exports.getPatient = async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await getPatientById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ message: 'Failed to fetch patient', error: error.message });
  }
};

exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const { name, birth_date, gender } = req.body;

  try {
    const updatedPatient = await updatePatient(id, {
      name,
      birth_date: birth_date ? new Date(birth_date) : undefined, // Convert to Date object if provided
      gender,
    });
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ message: 'Failed to update patient', error: error.message });
  }
};

exports.deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deletePatient(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ message: 'Failed to delete patient', error: error.message });
  }
};

exports.getPatientRecords = async (req, res) => {
  const { id } = req.params;

  try {
    const records = await getPatientRecords(id);
    if (!records || records.length === 0) {
      return res.status(404).json({ message: 'No records found for this patient' });
    }
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching patient records:', error);
    res.status(500).json({ message: 'Failed to fetch patient records', error: error.message });
  }
};

exports.searchPatientsByName = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: 'Name query parameter is required' });
  }

  try {
    const patients = await searchPatientsByName(name);
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error searching patients by name:', error);
    res.status(500).json({ message: 'Failed to search patients', error: error.message });
  }
};