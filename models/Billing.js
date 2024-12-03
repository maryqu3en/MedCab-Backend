const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Billing = sequelize.define('Billing', {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        Amount: { 
            type: DataTypes.DECIMAL(10, 2), 
            allowNull: false 
        },
        DateIssued: { 
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW 
        },
        DatePaid: { 
            type: DataTypes.DATE, 
            allowNull: true 
        },
        Status: { 
            type: DataTypes.ENUM('paid', 'pending'), 
            allowNull: false, 
            defaultValue: 'pending' 
        },
    });

    Billing.associate = (models) => {
        Billing.belongsTo(models.Patient, { foreignKey: 'PatientID' });
    };

    return Billing;
};
