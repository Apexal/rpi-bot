const {
  getTargetAndStudent,
  getSimpleStudentProperty,
  setStudentProperties
} = require('../src/utils.js');

module.exports = {
  name: 'grad',
  uses: {
    'View a users graduation year': '@User',
    'Set your own graduation year': '<year>'
  },
  async run(message, args) {
    const { target, student } = await getTargetAndStudent(message);

    // Determine get or set
    if (args.length === 0 || message.mentions.members.size === 1) {
      // Get
      return getSimpleStudentProperty(
        message,
        target,
        student,
        'graduation_year'
      );
    } else {
      // Set
      const graduation_year = parseInt(args[0]);
      if (
        isNaN(graduation_year) ||
        graduation_year < 1900 ||
        graduation_year > 2100
      )
        return message.channel.send('Please give a valid year!');

      return setStudentProperties(message, target, student, {
        graduation_year
      });
    }
  }
};
