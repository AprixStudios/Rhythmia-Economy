const fs = require('fs-extra');

module.exports = {
    name: "setup",
    description: "Start your life!",
    usage: "",
    aliases: ["start", "create", "startup"],
    category: "economy",

    code(client, message, args) {
        const { getDB } = client.functions.dbget;
        const { createDB } = client.functions.dbcreate;
        const { saveDB } = client.functions.dbsave;
        getDB(message.author.id).then(( err, res ) => {
            if (err) return console.error(err);
            if (res) return message.channel.send(`You have already started a life.`);
            else {
                fs.readJson(`./dbamount.json`, ( errr, amnt ) => {
                    if (errr) return console.error(errr);
                    amnt++;
                    createDB(message.author.id, amnt).then(newDB => {
                        saveDB(newDB);
                    });
                });
            }
        })
    }
}