const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Token = sequelize.define('Token', {
    ID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    UserID: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'User',
        key: 'ID',
      },
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
    Token.belongsTo(models.User, { foreignKey: 'UserID', as: 'User' });
  }

  return Token;
};
