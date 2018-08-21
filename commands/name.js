const { Student } = require('../database.js');
const config = require('../config.json');

const setName = async (message, target, student, first_name, last_name) => {
  console.log(`Setting ${target.tag}'s name to '${first_name} ${last_name}'`);
  student.first_name = first_name;
  student.last_name = last_name;
  await student.save();
  message.channel.send(`Set your name to \`${first_name} ${last_name}\`!`);
};

const getName = (message, target, student) => {
  if (!student.first_name || !student.last_name) {
    if (target.user.equals(message.author)) {
      // User hasn't set their own name yet
      message.channel.send(
        `You haven't set your name yet! Try \`${config.prefix}name First Last\``
      );
    } else {
      // User asked for someone's name who hasn't given it yet
      message.channel.send("They haven't set their name yet!");
    }
  } else {
    // Target has name set
    message.channel.send(
      `**${target.displayName}** is \`${student.first_name} ${
        student.last_name
      }\``
    );
  }
};

module.exports = {
  name: 'name',
  uses: {
    "View a student's name": '@User',
    'Set your own name': 'First Last'
  },
  async run(message, args) {
    let target = message.member;

    // Determine target
    if (message.mentions.members.size === 1) {
      target = message.mentions.members.first();
    }

    const [student, created] = await Student.findOrCreate({
      where: { discord_id: target.user.id }
    });

    if (created) console.log(`Created student record for @${target.user.tag}`);

    if (args.length === 0 || message.mentions.members.size === 1) {
      // Determine get or set
      // Get
      return getName(message, target, student);
    } else {
      // Set
      if (args.length !== 2) {
        return message.channel.send(
          `Invalid input! Give your first and last name: e.g. \`${
            config.prefix
          }name First Last\``
        );
      } else {
        return setName(message, target, student, args[0], args[1]);
      }
    }
  }
};