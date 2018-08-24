const Discord = require('discord.js');
//const settings = require('../settings.json'); 
exports.run = (client, message) => {
  let prefix = ",";
  message.delete();
  let guild = message.guild;
    const embed45 = new Discord.RichEmbed()
      .setColor(0x11B8D6)
      .setTimestamp()
      .addField(`Rank`, `Jouw rang is ${message.author.client.elevation(message)}`)
    const embed44 = new Discord.RichEmbed()
      .setColor(0x11B8D6)
      .setTimestamp()
      .addField(`Explaination`, `Dit betekent dat je de owner of de bot bent.\nMeestal is dit Dave.`)
    const embed46 = new Discord.RichEmbed()
      .setColor(0x11B8D6)
      .setTimestamp()
      .addField(`Explaination`, `Dit betekent dat je Owner bent in een server met de bot, in dit geval **${guild.name}**! Dankjewel voor het gebruik maken van deze bot!`)
    const embed47 = new Discord.RichEmbed()
      .setColor(0x11B8D6)
      .setTimestamp()
      .addField(`Explaination`, `Dit betekent dat je Admin bent in een server met de bot, in dit geval **${guild.name}**!\nDankjewel voor jouw support in het moderaten in **${guild.name}**\nGebruik ${prefix}help (in een server!!) en kijk naar (Admin) of lager om te zien welke commando's je kan uitvoeren.`)
    const embed48 = new Discord.RichEmbed()
      .setColor(0x11B8D6)
      .setTimestamp()
      .addField(`Explaination`, `dit betekent dat je Mod bent in een server met de bot, in dit geval **${guild.name}**!\nDankjewel voor jouw support in het moderaten in **${guild.name}**\nGebruik ${prefix}help (in een server!!) en kijk naar (Mod) of lager om te zien welke commando's je kan uitvoeren.`)
    const embed49 = new Discord.RichEmbed()
      .setColor(0x11B8D6)
      .setTimestamp()
      .addField(`Explaination`, `Dit betekent dat je Helper bent in een server met de bot, in dit geval **${guild.name}**!\nDankjewel voor jouw support in **${guild.name}**\nGebruik ${prefix}help (in een server!!) en kijk naar (Helper) of lager om te zien welke commando's je kan uitvoeren.`)
    const embed50 = new Discord.RichEmbed()
      .setColor(0x11B8D6)
      .setTimestamp()
      .addField(`Explaination`, `Dit betelent dat je Member bent in een server met de bot, in dit geval **${guild.name}**\nGebruik ${prefix}help (in een server!!) en kijk naar (Member) of lager om te zien welke commando's je kan uitvoeren.`)
    const embed51 = new Discord.RichEmbed()
      .setColor(0x11B8D6)
      .setTimestamp()
      .addField(`Explaination`, `This means you're **banned** in from this bot.\nDit betekent dat je gebant ben van de bot.`)

    message.author.sendEmbed(embed45);
    if (client.elevation(message) == 6) {
      message.author.sendEmbed(embed44);
    } else if (client.elevation(message) == 0) {
      message.author.sendEmbed(embed51);
    } else if (client.elevation(message) == 4) {
      message.author.sendEmbed(embed47);
    } else if (client.elevation(message) == 3) {
      message.author.sendEmbed(embed48);
    } else if (client.elevation(message) == 2) {
      message.author.sendEmbed(embed49);
    } else if (client.elevation(message) == 1) {
      message.author.sendEmbed(embed50);
    } else if (client.elevation(message) == 5) {
      message.author.sendEmbed(embed46);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['mylevel', 'mylvl', 'myr', 'lvl'],
  permLevel: 0
};

exports.help = {
  name: 'myrank',
  rank: 'Member',
  description: '(MEMBER) - Geeft jouw rang aan in de server waar deze commando werd uitgevoerd.',
  usage: 'myrank'
};
