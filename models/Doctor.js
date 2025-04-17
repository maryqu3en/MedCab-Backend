const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Doctor = sequelize.define('Doctor', {
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
            allowNull: false,
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created_by: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: 'User',
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

    Doctor.associate = (models) => {
        Doctor.belongsTo(models.User, { foreignKey: 'id', as: 'User' });
        Doctor.belongsTo(models.User, { foreignKey: 'created_by', as: 'Creator' });
        Doctor.hasMany(models.Staff);
    };

    return Doctor;
};
