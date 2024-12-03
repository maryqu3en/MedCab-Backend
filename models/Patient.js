const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Patient = sequelize.define('Patient', {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        Name: { type: DataTypes.STRING, allowNull: false },
        BirthDate: { type: DataTypes.DATE },
        Gender: { type: DataTypes.ENUM('male', 'female'), allowNull: false },
        Phone: { type: DataTypes.STRING },
        Email: { type: DataTypes.STRING, unique: true },
        Address: { type: DataTypes.STRING },
        EmergencyContact: { type: DataTypes.STRING },
        CreatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        UpdatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        DeletedAt: { type: DataTypes.DATE },
    });

    Patient.associate = (models) => {
        Patient.hasMany(models.Appointment);
        Patient.hasMany(models.Billing);
    };

    return Patient;
};
