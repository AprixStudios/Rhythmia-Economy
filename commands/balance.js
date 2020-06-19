const Discord = require('discord.js');

module.exports = {
    name: "balance",
    description: "Check your balance!",
    aliases: ["bal"],
    usage: "[user]",
    category: "economy",

    code(client, message, args) {
        const { getUser } = client.functions.get('getuser');
        const { getDB } = client.functions.get('dbfind');
        let user = getUser(args[0], client);
        if (!user) user = message.author;
        getDB(user.id).then(res => {
            if (!res) {
                if (user === message.author) return message.channel.send(`You have not started your life yet. Please do so by doing \`e-setup\``);
                else return message.channel.send(`This user does not have a life set up yet.`);
            }
            let purse = res.balance.purse;
            let bank = res.balance.bank;
            let netWorth = purse+bank;

            const balEmbed = new Discord.MessageEmbed()
            .setAuthor(user.tag, user.avatarURL)
            .addField(`Purse`, `$`+purse, true)
            .addField(`Bank`, `$`+bank, true)
            .addField(`Net Worth`, `$`+netWorth, true)

            return message.channel.send(balEmbed).catch(error => console.error(error));
        });
    }
}