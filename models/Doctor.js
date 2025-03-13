const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Doctor = sequelize.define('Doctor', {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        Name: { type: DataTypes.STRING, allowNull: false },
        Email: { type: DataTypes.STRING, allowNull: false, unique: true },
        Password: { type: DataTypes.STRING, allowNull: false },
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
        Doctor.belongsTo(models.Admin, { foreignKey: 'CreatedBy', as: 'Creator' });
        Doctor.hasMany(models.Appointment);
    };

    return Doctor;
};
