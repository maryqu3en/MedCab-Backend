const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usertype: {
      type: DataTypes.ENUM('doctor', 'staff', 'admin'),
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasOne(models.Doctor, { foreignKey: 'id', as: 'Doctor' });
    User.hasOne(models.Staff, { foreignKey: 'id', as: 'Staff' });
    User.hasMany(models.Token, { foreignKey: 'userId', as: 'Tokens' });
  };
  return User;
}