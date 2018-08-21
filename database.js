const config = require('./config.json');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.database.name, null, null, {
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const DormInfo = sequelize.define('dorm_info', {
  discord_id: Sequelize.STRING,
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

module.exports = { sequelize, DormInfo };
