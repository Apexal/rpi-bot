const {
  getTargetAndStudent,
  setStudentProperties
} = require('../src/utils.js');
const config = require('../config.json');

const getMajor = (message, target, student) => {
  if (!student.major) {
    if (target.user.equals(message.author)) {
      // User hasn't set their own major yet
      message.channel.send(
        `You haven't set major name yet! Try \`${config.prefix}major <major>\``
      );
    } else {
      // User asked for someone's major who hasn't given it yet
      message.channel.send("They haven't set their major yet!");
    }
  } else {
    // Target has major set
    message.channel.send(
      `**${target.displayName}**'s major is \`${student.major}\``
    );
  }
};

module.exports = {
  name: 'major',
  uses: {
    "View a student's major": '@User',
    'Set your own major': '<major>'
  },
  async run(message, args) {
    const { target, student } = await getTargetAndStudent(message);

    // Determine get or set
    if (args.length === 0 || message.mentions.members.size === 1) {
      // Get
      return getMajor(message, target, student);
    } else {
      // Set
      const major = args.join(' ');
      return setStudentProperties(message, target, student, { major });
    }
  }
};
