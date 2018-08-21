const { Student } = require('./database.js');

module.exports = {
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
