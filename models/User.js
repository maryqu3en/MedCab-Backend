module.exports = (sequelize, DataTypes) => {
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
    user_type: {
      type: DataTypes.ENUM('doctor', 'staff', 'admin'),
      allowNull: false,
    },
  }, {
    tableName: 'Users',
    timestamps: true,
    paranoid: true,
  });

  User.associate = (models) => {
    User.hasOne(models.Doctor, { foreignKey: 'id', as: 'Doctor' });
    User.hasOne(models.Staff, { foreignKey: 'id', as: 'Staff' });
    User.hasMany(models.Token, { foreignKey: 'user_id', as: 'Tokens' });
  };
  return User;
}