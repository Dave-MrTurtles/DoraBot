const Discord = require('discord.js');
exports.run = function(client, message, args) {
  let modlog = message.guild.channels.find('name', 'logs');
  const embed16 = new Discord.RichEmbed()
      .setColor(0x00E90B0B)
      .addField(`Error :no_entry:`, `Je hebt geen nummer ingevoerd!`);
  let messagecount = parseInt(args.join(' '));
  if(!messagecount) {
    message.channel.sendEmbed(embed16).then(m => m.delete(5000));
    message.delete();
    return;
  }
  if(messagecount > 99) {
    message.delete();
    message.channel.sendEmbed(
      new Discord.RichEmbed()
      .setColor(0x00E90B0B)
      .addField(`Error :no_entry:`, `Maximum is 99!`));
      return;
  }
  message.channel.fetchMessages({
    limit: messagecount + 1
  }).then(messages => message.channel.bulkDelete(messages));
  const embed15 = new Discord.RichEmbed()
      .setColor(0x0013CF0E)
      .addField(`Success :white_check_mark:`, `Succesvol ${messagecount} berichten verwijderd!`);
  message.channel.sendEmbed(embed15).then(m => m.delete(5000));

  const embed = new Discord.RichEmbed()
    .setColor(0x11B8D6)
    .setTimestamp()
    .addField('Actie', 'Clear')
    .addField('Moderator', `${message.author.username}#${message.author.discriminator}`)
    .addField('Berichten verwijderd', messagecount);
  if (!modlog) return message.author.sendMessage(`Er is geen #logs channel.\nAls je deze commando wilt loggen moet je deze channel aanmaken:'#logs'`);
  message.guild.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'clear',
  rank: 'Admin',
  description: '(ADMIN) - Verwijderd opgegeven aantal berichten in een channel.',
  usage: 'clear <aantal>'
};
