const Discord = require('discord.js');
exports.run = (client, message, args) => {
  message.delete();
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'logs');
  //if (!modlog) return message.reply('I cannot find a log channel named: logs').then(m => m.delete(5000));
  if (reason.length < 1) reason = "No reason specified.";
  if (message.mentions.users.size < 1) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Sorry, Ik kan geen onzichtbare vosjes verbannen.`)).then(m => m.delete(5000)).catch(console.error);

  if (!message.guild.member(user).bannable) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Sorry, Ik kan geen personen met hogere rangen verbannen.`)).then(m => m.delete(5000));
  message.guild.ban(user, 2);
  message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x0013CF0E)
            .setTimestamp()
            .addField(`Success ✅`, `${user} is verbannen!`)).catch(console.error);

  const embed = new Discord.RichEmbed()
    .setColor(0x11B8D6)
    .setTimestamp()
    .addField('Actie', 'Ban')
    .addField('Gebruiker', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reden', reason);
  if (!modlog) return message.author.sendMessage(`Er is geen #logs channel.\nAls je deze commando wilt loggen moet je deze channel aanmaken:'#logs'`);
  message.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'ban',
  rank: 'Admin',
  description: '(ADMIN) - Verbant de gementionde gebruiker.',
  usage: 'ban [mention] [reden]'
};
