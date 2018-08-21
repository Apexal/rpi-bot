const {
  getTargetAndStudent,
  setStudentProperties
} = require('../src/utils.js');
const config = require('../config.json');

const getName = (message, target, student) => {
  if (!student.first_name || !student.last_name) {
    if (target.user.equals(message.author)) {
      // User hasn't set their own name yet
      message.channel.send(
        `You haven't set your name yet! Try \`${
          config.prefix
        }name <first> <last>\``
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
    'Set your own name': '<first name> <last name>'
  },
  async run(message, args) {
    const { target, student } = await getTargetAndStudent(message);

    // Determine get or set
    if (args.length === 0 || message.mentions.members.size === 1) {
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
        return setStudentProperties(message, target, student, {
          first_name: args[0],
          last_name: args[1]
        });
      }
    }
  }
};
