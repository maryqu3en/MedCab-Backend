const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Admin = sequelize.define('Admin', {
        ID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        Name: { type: DataTypes.STRING, allowNull: false },
        Email: { type: DataTypes.STRING, allowNull: false, unique: true },
        Password: { type: DataTypes.STRING, allowNull: false },
        CreatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        UpdatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        DeletedAt: { type: DataTypes.DATE },
    });

    return Admin;
};
