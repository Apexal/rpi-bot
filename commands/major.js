const {
  getTargetAndStudent,
  getSimpleStudentProperty,
  setStudentProperties
} = require('../src/utils.js');

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
      return getSimpleStudentProperty(message, target, student, 'major');
    } else {
      // Set
      const major = args.join(' ');
      return setStudentProperties(message, target, student, { major });
    }
  }
};
