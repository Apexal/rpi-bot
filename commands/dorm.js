const {
  getTargetAndStudent,
  getSimpleStudentProperty,
  setStudentProperties
} = require('../src/utils.js');

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
      return getSimpleStudentProperty(message, target, student, 'dorm');
    } else {
      // Set
      const dorm = args.join(' ');
      return setStudentProperties(message, target, student, { dorm });
    }
  }
};
