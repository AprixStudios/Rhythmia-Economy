module.exports = {
    name: "upgrade",
    description: "Upgrade one of your skills!",
    usage: '<skill>',
    category: "abilities",

    code(client, message, args) {
        const { getDB } = client.functions.get('dbfind');
        const { saveDB } = client.functions.get('dbsave');
        const skillInfo = require(`./skills.json`);
        function skillCost(skill, diff, important) {
            return ((skill+3482)+(skill*diff*important*432))*2;
        }
        if (!args[0]) return message.channel.send(`Please insert a skill.`);
        if (!skillInfo.skills[args[0].toLowerCase()]) return message.channel.send(`That is not a skill.`);

        getDB(message.author.id).then(res => {
            if (res.skills[args[0].toLowerCase()] >= 10) return message.channel.send(`Your ${args[0]} skill is max level.`);
            let cost = skillCost(res.skills[args[0].toLowerCase()], skillInfo.skills[args[0].toLowerCase()].diff, skillInfo.skills[args[0].toLowerCase()].imp);
            if (res.balance.purse < cost) return message.channel.send(`You do not have enough money. You need ${cost-res.balance.purse} more in your purse, in order to upgrade this skill.`);
            res.balance.purse -= cost;
            res.skills[args[0].toLowerCase()] += 1;
            saveDB(res).then(message.channel.send(`Successfully upgraded your ${args[0]} skill to level ${res.skills[args[0].toLowerCase()]}`));
        });
    }
}