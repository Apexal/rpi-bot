const config = require('../config.json');

// Run when bot starts up
module.exports = client => {
  console.log(
    `Logged in as @${
      client.user.tag
    }!\nBot invite URL: https://discordapp.com/api/oauth2/authorize?client_id=${
      config.clientID
    }&scope=bot&permissions=${config.permissions}`
  );
};
