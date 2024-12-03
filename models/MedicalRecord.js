const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    ID: { type: String, required: true, unique: true }, // UUID
    PatientID: { type: String, required: true }, // Reference to Patient ID
    DoctorID: { type: String, required: true }, // Reference to Doctor ID
    Date: { type: Date, default: Date.now },
    Diagnosis: { type: String },
    Treatment: { type: String },
    Prescription: { type: String },
    FollowUpDate: { type: Date },
    Attachments: [{ // Array to store docs, images, etc.
        fileName: String,
        fileType: String,
        fileUrl: String, // Path or URL to the file storage
    }],
    CreatedAt: { type: Date, default: Date.now },
    UpdatedAt: { type: Date },
    DeletedAt: { type: Date },
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
