const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const DoctorWorkday = sequelize.define('DoctorWorkday', {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        WorkHours: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
    });

    DoctorWorkday.associate = (models) => {
        DoctorWorkday.belongsTo(models.Doctor, { foreignKey: 'DoctorID' });
        DoctorWorkday.belongsTo(models.WorkDay, { foreignKey: 'DayID' });
    };

    return DoctorWorkday;
};
