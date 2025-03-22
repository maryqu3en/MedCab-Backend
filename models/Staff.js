const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Staff = sequelize.define('Staff', {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            references: {
                model: 'User',
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
        CreatedBy: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Doctor',
                key: 'id',
            },
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
