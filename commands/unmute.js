const Discord = require('discord.js');
//const settings = require('../settings.json');
exports.run = (client, message, args) => {
  let prefix = ";";
  let time = args.slice(1).join(' ').split('?');
  let reason = args.slice(2).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'logs');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  //if (!modlog) return message.reply('I cannot find a log channel named: logs').catch(console.error);
  if (!muteRole) return;
  if (message.mentions.users.size < 1) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Sorry, Ik kan geen onzichtbare vosjes unmuten.`)).then(m => m.delete(5000)).catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Actie', 'Unmute')
    .addField('Gebruiker', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Moderator', `${message.author.username}#${message.author.discriminator}`)

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Sorry, Ik heb geen permissie om roles te managen.\nFix: Geef mij Manage Roles permissie`).then(m => m.delete(5000)).catch(console.error));

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole)
    message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x0013CF0E)
            .setTimestamp()
            .addField(`Success ✅`, `${user} is geunmute!`));
    if (!modlog) return message.channel.sendEmbed(embed);
    //client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);    
  } else {
      message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Deze gebruiker is niet gemute.\nOm te muten gebruik: ${prefix}mute [user] [tijd] [reden]`)).then(m => m.delete(5000));
  };

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'unmute',
  rank: 'Moderator',
  description: '(MOD) - Unmute de gementionde gebruiker',
  usage: 'unmute [mention]'
};
