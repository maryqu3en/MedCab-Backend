const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Admin = sequelize.define('Admin', {
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
            allowNull: false, 
            unique: true 
        },
        Password: { 
            type: DataTypes.STRING, 
            allowNull: false 
        },
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

    Admin.associate = (models) => {
        Admin.hasMany(models.Doctor);
        Admin.hasMany(models.Token);
    };

    return Admin;
};
