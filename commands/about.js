module.exports = {
  name: 'about',
  uses: {
    'View info about the bot': ''
  },
  dmEnabled: true,
  run(message) {
    const lines = ['**__[Bot Info]__**'];
    lines.push(
      `This bot was created by **Frank Matranga** (<https://github.com/Apexal>) using **Discord.js** and is open-source (<https://github.com/Apexal/rpi-bot>).`
    );
    lines.push(
      'Data given by students is *server-specific*, so if a student set personal info on one server and joins another server the bot is on, the personal data *does not* carry over.'
    );
    message.channel.send(lines, { split: true });
  }
};
