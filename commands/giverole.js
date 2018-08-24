const Discord = require('discord.js');
exports.run = (client, message, args) => { 
  message.delete();
  let role2 = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'logs');
  //if (!modlog) return message.reply('I cannot find a log channel named: logs').then(m => m.delete(5000));
  if (message.mentions.users.size < 1) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Sorry, Ik kan geen onzichtbare vosjes rollen geven.`)).then(m => m.delete(5000)).catch(console.error);
  if (role2.length < 1) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Je bent de role vergeten in te voeren!`)).then(m => m.delete(5000)).catch(console.error);
  let role = message.guild.roles.find('name', role2);
  if (!role) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Sorry, De role ${role2} bestaat niet.`)).then(m => m.delete(5000)).catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Actie', 'Give Role')
    .addField('Gebruiker', `${user.username}#${user.discriminator}`)
    .addField('Moderator', `${message.author.username}#${message.author.discriminator}`)
    .addField('Role', role);
  
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Sorry, Ik heb geen permissie om roles te managen.\nFix: Geef mij Manage Roles permissie.`)).then(m => m.delete(5000));
  if (message.guild.member(user).roles.has(role.id)) {
    message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `${user} heeft al de role ${role2}.`)).then(m => m.delete(5000)).catch(console.error);
  } else {
    message.guild.member(user).addRole(role).then(() => {
      message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x0013CF0E)
            .setTimestamp()
            .addField(`Success ✅`, `De role ${role2} is succesvol gegeven aan ${user}`)).then(m => m.delete(5000)).catch(console.error);
      if (!modlog) return message.author.sendMessage(`Er is geen #logs channel.\nAls je deze commando wilt loggen moet je deze channel aanmaken:'#logs'`);
      message.guild.channels.get(modlog.id).sendEmbed(embed);
    }); 
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 5
};

exports.help = {
  name: 'giverole',
  rank: 'Owner',
  description: '(OWNER) - Gives role to mentioned person.',
  usage: 'giverole [mention] [role]'
};
