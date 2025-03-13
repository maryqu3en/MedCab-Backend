const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Token = sequelize.define('Token', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    DoctorID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    AdminID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    RefreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ExpiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Token.associate = (models) => {
    Token.belongsTo(models.Admin, { foreignKey: 'AdminID', as: 'Admin' });
    Token.belongsTo(models.Doctor, { foreignKey: 'DoctorID', as: 'Doctor' });
  }

  return Token;
};
