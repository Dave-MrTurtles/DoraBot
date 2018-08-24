const Discord = require('discord.js');
exports.run = (client, message, args) => {
    message.delete();
    var fortunes = [
        "Ja",
        "Nee",
        "Misschien",
        "Ooit",
        "Nooit!",
        "TI-TITI-DORA",
        "Zeker weten!",
        "Denk het niet.",
        "Zerker NIET!",
        "Denk het wel."
    ];



    if (args[1]) {
        message.channel.sendEmbed(new Discord.RichEmbed()
           .setColor(0x11B8D6)
           .setTimestamp()
           .setAuthor(message.author.username, message.author.avatarURL)
           .addField(`Vraag`, `${args.join(" ")}`)
           .addField(`Antwoord <:dora:482535869241229315>`, `${fortunes[Math.floor(Math.random() * fortunes.length)]}`)
           .setFooter("© 8Ball"));
    } else {
        message.channel.sendEmbed(new Discord.RichEmbed()
            .setColor(0x00E90B0B)
            .setTimestamp()
            .addField(`Error ❌`, `Sorry, Dat begrijp ik niet.`)).then(m => m.delete(5000)).catch(console.error);
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
