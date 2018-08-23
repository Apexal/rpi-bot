const config = require('../config.json');

// Run when bot starts up
module.exports = client =>
  client.on('guildMemberAdd', member => {
    console.log(
      `[New member joined server ${member.guild.name}: @${member.user.tag}]`
    );

    const lines = [`Welcome to **${member.guild.name}**!`];
    const commandList = ['name', 'dorm', 'major', 'grad']
      .map(com => '`' + config.prefix + com + '`')
      .join(', ');

    lines.push(
      `Use ${commandList} **on the server** to set your info for other students to see!`
    );
    lines.push(`Use \`${config.prefix}who @User\` to see info on a student.`);

    member.send(lines, { split: true });
  });
