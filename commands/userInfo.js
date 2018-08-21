module.exports = {
  name: 'userinfo',
  uses: {
    'View your own Discord info': '',
    'View a users Discord info': '@User'
  },
  run(message, args) {
    message.channel.send(
      `**${message.author.tag}**:\nUser Discord ID: ${message.author.id}`
    );
  }
};
