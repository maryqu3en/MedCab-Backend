const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Patient = sequelize.define('Patient', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        birth_date: { type: DataTypes.DATE },
        gender: { type: DataTypes.ENUM('male', 'female'), allowNull: false },
        phone: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, unique: true },
        address: { type: DataTypes.STRING },
        emergency_contact: { type: DataTypes.STRING },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        deleted_at: { type: DataTypes.DATE },
    });

    return Patient;
};
