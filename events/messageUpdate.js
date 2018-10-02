const Discord = require('discord.js')
module.exports = (messageUpdate, oldMessage, newMessage) => {
  const embed = new Discord.RichEmbed()
    .setColor(0x11B8D6)
    .setTimestamp()
    .setTitle('Message Edited')
    .addField('User', `${messageUpdate.author.tag} (@<${messageUpdate.author.id}>)`)
    .addField('Message', messageUpdate.content)
    .addField('Message', messageUpdate.content);
  let actionlog = messageUpdate.guild.channels.find('name', 'action-log');
  if(messageUpdate.author.bot) return;
  if(newMessage.content != oldMessage){
       if (!actionlog) return messageUpdate.author.sendMessage(`Er is geen #logs channel.\nAls je deze commando wilt loggen moet je deze channel aanmaken:'#logs'`);
       messageUpdate.guild.channels.get(actionlog.id).sendEmbed(embed);
   }
  console.log(messageUpdate.content)
  //messageUpdate.channel.send(`The message : "${messageUpdate.content}" by ${messageUpdate.author.tag} was deleted.`)

  /*const embed = new Discord.RichEmbed()
    .setColor(0x11B8D6)
    .setTimestamp()
    .setTitle('Message Edited')
    .addField('User', `${messageUpdate.author.tag} (@<${messageUpdate.author.id}>)`)
    .addField('Message', messageUpdate.content)
    .addField('Message', messageUpdate.content);

  if (!actionlog) return messageUpdate.author.sendMessage(`Er is geen #logs channel.\nAls je deze commando wilt loggen moet je deze channel aanmaken:'#logs'`);
  messageUpdate.guild.channels.get(actionlog.id).sendEmbed(embed);*/

};
