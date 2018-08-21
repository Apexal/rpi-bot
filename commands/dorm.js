const {
  getTargetAndStudent,
  setStudentProperties
} = require('../src/utils.js');
const config = require('../config.json');

const getDorm = (message, target, student) => {
  if (!student.dorm) {
    if (target.user.equals(message.author)) {
      // User hasn't set their own dorm yet
      const lines = [
        `You haven't set your dorm info yet! Try \`${
          config.prefix
        }dorm Hall-Room\``
      ];
      lines.push(`e.g. \`${config.prefix}dorm Burdet-999-A1\``);
      message.channel.send(lines, { split: true });
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
    'Set your own dorm info': '<dorm-info>'
  },
  async run(message, args) {
    const { target, student } = await getTargetAndStudent(message);

    // Determine get or set
    if (args.length === 0 || message.mentions.members.size === 1) {
      // Get
      return getDorm(message, target, student);
    } else {
      // Set
      const dorm = args.join(' ');
      return setStudentProperties(message, target, student, { dorm });
    }
  }
};
