const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserType: {
      type: DataTypes.ENUM('doctor', 'staff', 'admin'),
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Doctor, { foreignKey: 'ID', as: 'Doctor' });
    User.hasOne(models.Staff, { foreignKey: 'ID', as: 'Staff' });
    User.hasMany(models.Token, { foreignKey: 'UserID', as: 'Tokens' });
  };
  return User;
}