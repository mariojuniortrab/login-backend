const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:senhadobanco@localhost:5433/marioso');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize