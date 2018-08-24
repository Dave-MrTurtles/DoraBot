const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    /*message.delete();
    message.channel.sendEmbed(
      new Discord.RichEmbed()
      .setColor(0x00EEFF3E)
      .addField(`Under Maintance :warning:`, `This command is under maintance!\nAdd the Muted role manually.`));
      return;
  */
  let prefix = ",";
  let time = args[1];
  let reason = args.slice(2).join(' ');
  let user = message.mentions.users.first();
  let modlog = message.guild.channels.find('name', 'logs');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if(!muteRole){
    message.channel.sendEmbed(new Discord.RichEmbed()
      .setColor(0x00EEFF3E)
      .addField(`Installeren...`, `Deze commando is nog nooit gebruikt, Alles aan het instellen.\nProbeer het opnieuw in 5 seconden`)).then(m => m.delete(15000));
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[],
        position: "5"
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  if (!reason) reason = "Geen reden ingevoerd.";
  if (message.mentions.users.size < 1) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Sorry, Ik kan geen onzichtbare vosjes muten.`)).then(m => m.delete(5000)).catch(console.error);
  const embed = new Discord.RichEmbed()
    .setColor(0x11B8D6)
    .setTimestamp()
    .addField('Actie', 'Mute')
    .addField('Gebruiker', `${user} (${user.id})`)
    .addField('Moderator', `${message.author.username}#${message.author.discriminator}`)
    .addField('Tijd', `${time} Seconden`) 
    .addField('Reden:', reason)
  if (!time) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Je moet een tijdslimiet instellen!`)).then(m => m.delete(5000));
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Sorry, Ik heb geen permissie om roles te managen.\nFix: Geef mij Manage Roles permissie`).then(m => m.delete(5000)).catch(console.error));

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Deze gebruiker is al gemute.\nOm te unmuten gebruik: ${prefix}unmute [mention]`)).then(m => m.delete(5000));
  } /*else if (!time && !reason) { 
    message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x0013CF0E)
            .setTimestamp()
            .addField(`Warning ⚠`, `Something went wrong! Forgot time?`));
    message.guild.member(user).addRole(muteRole).then(() => {
      message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x0013CF0E)
            .setTimestamp()
            .addField(`Success ✅`, `Successfully muted ${user} for **Forever** Seconds.\n**Reason:** ${reason}`));
      if (!modlog) return message.channel.sendEmbed(embed);
      client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });*/
  /*}*/ else {
    message.guild.member(user).addRole(muteRole).then(() => {
      message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x0013CF0E)
            .setTimestamp()
            .addField(`Success ✅`, `Successfully muted **${user}** for **${time}** Seconds.\n**Reason:** ${reason}`));
      //if (!modlog) return message.channel.sendEmbed(embed);
      //client.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
      setTimeout(function() {
        message.guild.member(user).removeRole(muteRole);
      }, time*1000); 
    }); 
  } 

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'mute',
  rank: 'Moderator',
  description: '(MOD) - Mute een gebruiker met een specifieke tijd en reden!',
  usage: 'mute [gebruiker] [tijd] [reden]'
};
