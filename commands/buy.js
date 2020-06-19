const Discord = require('discord.js');

module.exports = {
    name: "buy",
    description: "Buy an item from the shop!",
    usage: "",
    category: "economy",


    code(client, message, args) {
        const { getDB } = client.functions.get('dbfind');
        const { saveDB } = client.functions.get('dbsave');
        const fs = require('fs-extra');
        fs.readJson(`./shop.json`, (errr, shop) => {
            if (errr) return console.error(errr);
            getDB(message.author).then(res => {
                let buyingThisItem = args[0].toLowerCase();
                if (res.unlocks.colors[buyingThisItem]) return message.channel.send(`You have already bought this item.`);
                if (!shop.roles[buyingThisItem]) return message.channel.send(`That is not a valid color.`);
                let theRoleTheyWantToBuy = shop.roles[buyingThisItem];
                let theMoneyTheyCanSpend = res.balance.purse;
                if (theRoleTheyWantToBuy.cost > theMoneyTheyCanSpend) return message.channel.send(`You do not have enough money to buy this color.`);
                res.balance.purse = res.balance.purse-theRoleTheyWantToBuy.cost;
                res.unlocks.colors.push(theRoleTheyWantToBuy.name.toLowerCase());
                saveDB(res).then(() => {
                    const boughtEmbed = new Discord.MessageEmbed()
                    .setColor()
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(`You have successfully bought the ${theRoleTheyWantToBuy.name} color role! Do \`e-color\` to equip or unequip it.`);
                    message.channel.send(boughtEmbed);
                });
            });
        });
    }
}