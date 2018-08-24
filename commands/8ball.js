const Discord = require('discord.js');
exports.run = (client, message, args) => {
    message.delete();
    var fortunes = [
        "Ja",
        "Nee",
        "Misschien",
        "Ooit",
        "Nooit!",
        "Ga weg!",
        "Swieber niet stelen!",
        "Zeker weten!",
        "Sowieso nee!"
    ];



    if (args[1]) {
        message.channel.sendEmbed(new Discord.RichEmbed()
           .setColor(0x11B8D6)
           .setTimestamp()
           .setAuthor(message.author.username, message.author.avatarURL)
           .addField(`Questioned`, `${args.join(" ")}`)
           .addField(`🐢 Answer`, `${fortunes[Math.floor(Math.random() * fortunes.length)]}`)
           .setFooter("© 8Ball"));
    } else {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Sorry, Dat versta ik niet.`)).then(m => m.delete(5000)).catch(console.error);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ball', '8'],
  permLevel: 1
};

exports.help = {
  name: '8ball',
  rank: 'Member',
  description: '(MEMBER) - Praat met Dora.',
  usage: '8ball [text]'
};
