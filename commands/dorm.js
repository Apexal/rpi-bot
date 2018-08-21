const { Student } = require('../database.js');
const { getTargetAndStudent } = require('../utils.js');
const config = require('../config.json');

const setDorm = async (message, target, student, dorm) => {
  console.log(`Setting ${target.user.tag}'s dorm to '${dorm}'`);
  student.dorm = dorm;
  await student.save();
  return message.channel.send(`Set your dorm to \`${dorm}\`!`);
};

const getDorm = (message, target, student) => {
  if (!student.dorm) {
    if (target.user.equals(message.author)) {
      // User hasn't set their own dorm yet
      message.channel.send(
        `You haven't set your dorm info yet! Try \`${
          config.prefix
        }dorm Hall-Room\`\ne.g. \`${config.prefix}dorm Burdet-999-A1\``
      );
    } else {
      // User asked for someone's dorm who hasn't given it yet
      message.channel.send("They haven't set their dorm yet!");
    }
  } else {
    // Target has dorm set
    message.channel.send(
      `**${target.displayName}**'s Dorm: \`${student.dorm}\``
    );
  }
};

module.exports = {
  name: 'dorm',
  uses: {
    'View a users dorm info': '@User',
    'Set your own dorm info': 'Burdett-100-A1'
  },
  async run(message, args) {
    const { target, student } = await getTargetAndStudent(message);

    if (args.length === 0 || message.mentions.members.size === 1) {
      // Determine get or set
      // Get
      return getDorm(message, target, student);
    } else {
      // Set
      return setDorm(message, target, student, args[0]);
    }
  }
};
