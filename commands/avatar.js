const Discord = require('discord.js');
exports.run = (client, message, args) => {
  message.delete();
  let user = message.mentions.users.first();
  if (message.mentions.users.size < 1) user = message.author;
  const embed98 = new Discord.RichEmbed()
    .setColor(0x0013CF0E)
    .setTimestamp()
    .addField(`Avatar van ${user.username}`, `${user.avatarURL}`)
    .setThumbnail(user.avatarURL)
  message.channel.sendEmbed(embed98);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ava', 'av'],
  permLevel: 1
};

exports.help = {
  name: 'avatar',
  rank: 'Member',
  description: '(MEMBER) - Link naar avatar van de gementionde persoon.',
  usage: 'avatar [mention]'
};
