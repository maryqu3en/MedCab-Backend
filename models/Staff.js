const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Staff = sequelize.define('Staff', {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'id',
            },
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
        Staff.belongsTo(models.User, { foreignKey: 'ID', as: 'User' });
        Staff.belongsTo(models.Doctor, { foreignKey: 'CreatedBy' });
    };

    return Staff;
};
