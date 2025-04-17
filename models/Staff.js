const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Staff = sequelize.define('Staff', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            references: {
                model: 'User',
                key: 'id',
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM('nurse', 'receptionist'),
            allowNull: false,
        },
        created_by: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'Doctor',
                key: 'id',
            },
        },
        status: {
            type: DataTypes.ENUM('pending', 'active', 'inactive'),
            defaultValue: 'pending',
        },
    },
    {
        timestamps: true,
        paranoid: true,
    });

    Staff.associate = (models) => {
        Staff.belongsTo(models.User, { foreignKey: 'id', as: 'User' });
        Staff.belongsTo(models.Doctor, { foreignKey: 'created_by', as: 'Creator' });
    };

    return Staff;
};
