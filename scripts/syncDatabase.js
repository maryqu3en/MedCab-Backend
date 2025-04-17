const { sequelize } = require('../config/postgres');

console.log(sequelize instanceof require('sequelize').Sequelize); 

(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('Database synchronized successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Error synchronizing database:', err);
        process.exit(1);
    }
})();