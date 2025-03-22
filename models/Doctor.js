const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Doctor = sequelize.define('Doctor', {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        Phone: { type: DataTypes.STRING },
        Address: { type: DataTypes.STRING },
        Specialty: { type: DataTypes.STRING },
        CreatedBy: { type: DataTypes.UUID },
    },
        {
            timestamps: true,
            paranoid: true,
            indexes: [
                {
                    fields: ['Email'],
                    unique: true,
                }
            ],
        });

    Doctor.associate = (models) => {
        Doctor.belongsTo(models.User, { foreignKey: 'ID', as: 'User' });
        Doctor.belongsTo(models.User, { foreignKey: 'CreatedBy', as: 'Creator' });
        Doctor.hasMany(models.Staff);
    };

    return Doctor;
};
