const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Doctor = sequelize.define('Doctor', {
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
            allowNull: false,
        },
        Specialty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CreatedBy: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'User',
                key: 'ID',
            },
        },
    },
        {
            timestamps: true,
            paranoid: true,
        });

    Doctor.associate = (models) => {
        Doctor.belongsTo(models.User, { foreignKey: 'ID', as: 'User' });
        Doctor.belongsTo(models.User, { foreignKey: 'CreatedBy', as: 'Creator' });
        Doctor.hasMany(models.Staff);
    };

    return Doctor;
};
