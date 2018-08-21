const config = require('./config.json');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database.name, null, null, {
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Student = sequelize.define('students', {
  discord_id: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  major: Sequelize.STRING,
  dorm: Sequelize.STRING
});

sequelize.authenticate().then(
  function(err) {
    console.log('Connection has been established successfully.');
  },
  function(err) {
    console.log('Unable to connect to the database:', err);
  }
);

sequelize.sync();

module.exports = { sequelize, Student };
