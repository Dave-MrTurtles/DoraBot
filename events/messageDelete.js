const Discord = require('discord.js')
module.exports = messageDelete => {

  console.log(messageDelete.content)
  messageDelete.channel.send(`The message : "${messageDelete.content}" by ${messageDelete.author.tag} was deleted.`)

};
