const config = require('../config.json');

const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: config.database.path
});

/* Define the Student schema */
const Student = sequelize.define('students', {
  discord_id: Sequelize.STRING,
  server_id: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  major: Sequelize.STRING,
  dorm: Sequelize.STRING,
  graduation_year: Sequelize.INTEGER
});

// Test connection
sequelize.authenticate().then(
  function(err) {
    console.log('Connection has been established successfully.');
  },
  function(err) {
    console.log('Unable to connect to the database:', err);
  }
);

// Creates databases if they don't exist
sequelize.sync();

module.exports = { sequelize, Student };
