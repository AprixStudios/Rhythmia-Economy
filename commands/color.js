module.exports = {
    name: "color",
    description: "Equip or unequip a color role.",
    usage: "<color>",
    category: "roles",


    code(client, message, args) {
        const { getDB } = client.functions.get('dbfind');
        const fs = require('fs-extra');
        fs.readJson(`./shop.json`, (errr, shop) => {
            if (errr) return console.error(errr);
            getDB(message.author.id).then(res => {
                let theColorTheyWant = args[0];
                if (!theColorTheyWant) return message.channel.send(`Please tell me what color you'd like.`);
                if (!shop.roles[theColorTheyWant]) return message.channel.send(`That is not a valid color.`);
                if (!res.unlocks.color.includes(theColorTheyWant)) return message.channel.send(`You do not have that color unlocked.`);
                let theRoleTheyWant = message.guild.roles.cache.get(shop.roles[theColorTheyWant].id);
                switch (message.member.roles.cache.has(theRoleTheyWant.id)) {
                    case false:
                        message.member.roles.add(theRoleTheyWant.id);
                        message.channel.send(`Successfully gave you the ${shop.roles[theColorTheyWant].name} color!`);
                        break;
                    case true:
                        message.member.roles.remove(theRoleTheyWant.id);
                        message.channel.send(`Successfully removed your the ${shop.roles[theColorTheyWant].name} color!`);
                }
            });
        });
    }
}