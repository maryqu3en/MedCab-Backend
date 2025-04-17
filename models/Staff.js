const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Staff = sequelize.define('Staff', {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            references: {
                model: 'User',
                key: 'ID',
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
        CreatedBy: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Doctor',
                key: 'ID',
            },
        },
        Status: {
            type: DataTypes.ENUM('Pending', 'Active', 'Inactive'),
            defaultValue: 'Pending',
        },
    },
        {
            timestamps: true,
            paranoid: true,
        });

    Staff.associate = (models) => {
        Staff.belongsTo(models.User, { foreignKey: 'ID', as: 'User' });
        Staff.belongsTo(models.Doctor, { foreignKey: 'CreatedBy', as: 'Creator' });
    };

    return Staff;
};
