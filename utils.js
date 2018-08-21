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
  }
};
