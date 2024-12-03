const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Appointment = sequelize.define('Appointment', {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        Date: { 
            type: DataTypes.DATE, 
            allowNull: false 
        },
        Time: { 
            type: DataTypes.TIME, 
            allowNull: false 
        },
        VisitReason: { 
            type: DataTypes.STRING, 
            allowNull: true 
        },
        Status: { 
            type: DataTypes.ENUM('scheduled', 'completed', 'canceled'), 
            allowNull: false, 
            defaultValue: 'scheduled' 
        },
    });

    Appointment.associate = (models) => {
        Appointment.belongsTo(models.Patient, { foreignKey: 'PatientID' });
        Appointment.belongsTo(models.Doctor, { foreignKey: 'DoctorID' });
    };

    return Appointment;
};
