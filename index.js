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
  console.log(`[Loaded ${eventFiles.length} event handlers]`);
}

// Load all commands
client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'))
  .map(file => file.slice(0, -3));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(file, command);
  console.log(`[Loaded ${commandFiles.length} commands]`);
}

// Command handling
client.on('message', msg => {
  if (msg.content.startsWith(config.prefix)) {
    const parts = msg.content.split(' ');
    let [commandName, ...args] = parts;
    commandName = commandName.substring(1);

    // Help command
    if (commandName === 'help' && args.length > 0) {
      if (!client.commands.has(args[0]))
        return msg.channel.send('No such command exists!');

      const command = client.commands.get(args[0]);
      const uses = Object.keys(command.uses)
        .map(
          // e.g. 'View a users dorm info: `!dorm @User`'
          desc =>
            desc +
            ': `' +
            config.prefix +
            args[0] +
            ' ' +
            command.uses[desc] +
            '`'
        )
        .join('\n');

      msg.channel.send(
        '**Command**: `' + config.prefix + args[0] + '`\n' + uses
      );
    } else if (client.commands.has(commandName)) {
      // Execute command
      console.log(
        `[Executing command '${commandName}' for @${msg.author.tag}] '${
          msg.content
        }'`
      );
      client.commands.get(commandName).run(msg, args);
    }
  }
});

client.login(config.token);
