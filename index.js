const fs = require('fs');

const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

// Holds all event handlers
client.events = new Discord.Collection();
const eventFiles = fs
  .readdirSync('./events')
  .filter(file => file.endsWith('.js'))
  .map(file => file.slice(0, -3)); // Remove '.js'

for (const file of eventFiles) {
  const handler = require(`./events/${file}`);
  client.events.set(file, handler);

  client.on(file, () => handler(client));
}

client.on('message', msg => {});

client.login(config.token);
