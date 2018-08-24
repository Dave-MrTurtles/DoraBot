const Discord = require('discord.js');
exports.run = (client, message, args) => {
  message.delete();
  let reason = args.slice(1).join(' ');
  client.unbanReason = reason;
  client.unbanAuth = message.author;
  let user = args[0];
  //let modlog = message.guild.channels.find('name', 'logs');
  //if (!modlog) return message.reply('I cannot find a log channel named: logs').then(m => m.delete(5000));
  if (reason.length < 1) reason = "No reason specified.";
  if (!user) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Ik heb een user id nodig, Bijvoorbeeld: 275303108589125633`)).then(m => m.delete(5000)).catch(console.error);
  message.guild.unban(user);
  message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x0013CF0E)
            .setTimestamp()
            .addField(`Success ✅`, `<@${user}> is geunbant!`)).then(m => m.delete(5000)).catch(console.error);

  const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setTimestamp()
            .addField('Actie', 'Ban')
            .addField('Gebruiker', `${user.username}#${user.discriminator}`)
            .addField('Moderator', `${message.author.username}#${message.author.discriminator}`)
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
  name: 'unban',
  rank: 'Admin',
  description: '(ADMIN) - Unbant de ingevoerde gebruikers id.',
  usage: 'unban [userid] [reden]'
};
