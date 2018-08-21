const { Student } = require('./database.js');
const config = require('../config.json');

module.exports = {
  /* Given a command message, determine whether the target is the author or a mentioned user, then find or create the student record for them. */
  async getTargetAndStudent(message) {
    let target = message.member;

    // Determine target
    if (message.mentions.members.size === 1) {
      target = message.mentions.members.first();
    }

    const [student, created] = await Student.findOrCreate({
      where: { discord_id: target.user.id }
    });

    if (created) console.log(`Created student record for @${target.user.tag}`);
    return { target, student };
  },
  getSimpleStudentProperty(message, target, student, prop) {
    if (!student[prop]) {
      if (target.user.equals(message.author)) {
        // User hasn't set their own major yet
        message.channel.send(
          `You haven't set your ${prop} yet! Try \`${
            config.prefix
          }help ${prop}\``
        );
      } else {
        // User asked for someone's major who hasn't given it yet
        message.channel.send(`They haven't set their ${prop} yet!`);
      }
    } else {
      // Target has major set
      message.channel.send(
        `**${target.displayName}**'s ${prop} is \`${student[prop]}\``
      );
    }
  },
  /* Sets the passed properties and values on a student, logs to console, and to the server once done. */
  async setStudentProperties(message, target, student, data) {
    const props = Object.keys(data);
    const values = Object.values(data);
    console.log(
      `Setting ${target.user.tag}'s ${props.join(', ')} to '${values.join(
        ', '
      )}'`
    );

    // I love this
    Object.assign(student, data);

    await student.save();

    message.channel.send(
      `Set your ${props.join(' ')} to \`${values.join(' ')}\`!`
    );
  }
};
