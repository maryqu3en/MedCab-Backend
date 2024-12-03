const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const WorkDay = sequelize.define('WorkDay', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Title: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
    });

    WorkDay.associate = (models) => {
        WorkDay.belongsToMany(models.Doctor, {
            through: models.DoctorWorkday,
            foreignKey: 'DayID',
        });
    };

    return WorkDay;
};
