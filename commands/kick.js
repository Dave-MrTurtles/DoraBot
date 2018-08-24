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
            .addField(`Error ❌`, `Sorry, Ik kan geen onzichtbare vosjes kicken`)).then(m => m.delete(5000)).catch(console.error);

  if (!message.guild.member(user).kickable) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Sorry, Ik kan geen personen met hogere rangen kicken`)).then(m => m.delete(5000));
  message.guild.member(user).kick();
  message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x0013CF0E)
            .setTimestamp()
            .addField(`Success ✅`, `${user}is Gekickt!`)).then(m => m.delete(5000)).catch(console.error);

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Actie', 'kick')
    .addField('Gebruiker', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator', `${message.author.username}#${message.author.discriminator}`)
    .addField('Reden', reason);
  if (!modlog) return message.author.sendMessage(`Er is geen #logs channel.\nAls je deze commando wilt loggen moet je deze channel aanmaken:'#logs'`);
  //message.channel.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'kick',
  rank: 'Moderator',
  description: '(MOD) - Kickt de gementionde gebruiker.',
  usage: 'kick [mention] [reden]'
};
