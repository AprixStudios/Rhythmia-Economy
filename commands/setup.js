  const fs = require('fs-extra');

module.exports = {
    name: "setup",
    description: "Start your life!",
    usage: "",
    aliases: ["start", "create", "startup"],
    category: "economy",

    async code(client, message, args) {
        const dbget = client.functions.get('dbfind');
        const dbcreate = client.functions.get('dbcreate');
        const dbsave = client.functions.get('dbsave');
        dbget.getDB(message.author.id).then(res => {
            if (res) return message.channel.send(`You have already started a life.`);
            else {
                fs.readJson(`./dbamount.json`, ( errr, amnt ) => {
                    if (errr) return console.error(errr);
                    amnt.id++;
                    dbcreate.createDB(message.author.id, amnt.id).then(newDB => {
                        dbsave.saveDB(newDB).then(message.channel.send(`Success.`));
                        fs.writeFile(`./dbamount.json`, JSON.stringify(amnt, null, 2));
                    });
                });
            }
        });
    }
}