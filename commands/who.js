const { getTargetAndStudent } = require('../utils.js');
const Discord = require('discord.js');

const createStudentEmbed = (target, student) => {
  const joinedFromToday = Math.round(
    (new Date() - target.joinedAt) / (1000 * 60 * 60 * 24)
  );

  // Create embed
  return (
    new Discord.RichEmbed()
      .setColor('#0099ff')
      .setTitle(`Class of ${student.graduation_year || '-'}`)
      //.setURL('https://discord.js.org/')
      .setAuthor(
        !student.first_name || !student.last_name
          ? 'Unnamed Student'
          : `${student.first_name} ${student.last_name}`,
        'https://s3.amazonaws.com/images.hamlethub.com/hh20mediafolder/2745/201602/Rensselaer_at_Hartford_Seal.svg.png',
        'https://discord.js.org'
      )
      .setThumbnail(target.user.displayAvatarURL)
      .addField('Dorm', student.dorm || '-', true)
      .addField('Major', student.major || '-', true)
      .setFooter(
        `${'@' + target.user.tag} | Joined server ${joinedFromToday} days ago`
      )
  );
};

module.exports = {
  name: 'who',
  uses: {
    'View your own Discord info': '',
    'View a users Discord info': '@User'
  },
  async run(message, args) {
    const { target, student } = await getTargetAndStudent(message);

    const userEmbed = createStudentEmbed(target, student);
    message.channel.send(userEmbed);

    // Alert target if missing name
    if (!student.first_name || !student.last_name)
      message.channel.send(
        `${target}, set your name with \`!name First Last\` \nYou can also set the other info with \`!major\`, \`!dorm\`, etc.`
      );
  }
};
