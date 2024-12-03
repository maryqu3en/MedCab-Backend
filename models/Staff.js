const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Staff = sequelize.define('Staff', {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        Name: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        Email: { 
            type: DataTypes.STRING, 
            unique: true, 
            allowNull: false 
        },
        Password: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
        Phone: { 
            type: DataTypes.STRING, 
            allowNull: true 
        },
        Role: { 
            type: DataTypes.ENUM('nurse', 'receptionist'), 
            allowNull: false 
        },
    });

    Staff.associate = (models) => {
        Staff.belongsTo(models.Doctor, { foreignKey: 'CreatedBy' });
    };

    return Staff;
};
