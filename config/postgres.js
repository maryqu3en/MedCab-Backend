const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.PG_DATABASE, process.env.PG_USER, process.env.PG_PASSWORD, {
  host: process.env.PG_HOST,
  dialect: 'postgres'
});

module.exports.sequelize = sequelize;

module.exports.testPGConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to Postgres has been established successfully.');
  }
  catch (error) {
    console.error('Unable to connect to the Postgres database:', error);
  }
};