const Discord = require('discord.js');
exports.run = (client, message, args) => {
  message.delete();
  let say = args.join(" ")
  if (!say) return;
  message.channel.sendMessage(say);
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 6
};

exports.help = {
  name: 'say',
  rank: 'Owner',
  description: '(OWNER) - Dora will say what you want.',
  usage: 'say [text]'
};
