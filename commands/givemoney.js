module.exports = {
    name: "givemoney",
    description: "Donate money to people!",
    aliases: ['give', 'give-money'],
    usage: '<user> <amount>',
    category: "economy",

    code(client, message, args) {
        const { getDB } = client.functions.get('dbfind');
        const { saveDB } = client.functions.get('dbsave');
        const { getUser } = client.functions.get('getuser');

        let user = getUser(args[0], client);
        if (!user) return message.channel.send(`Please specify a user.`);
        if (user === message.author) return message.channel.send(`You can't give yourself money.`);
        getDB(message.author.id).then(sender => {
            if (!sender) return message.channel.send(`You have not started your life yet. Please do so by doing \`e-setup\``);
            getDB(user.id).then(receiver => {
                if (!receiver) return message.channel.send(`This user does not have a life set up yet.`);
                let amount = parseInt(args[1]);
                let tAmount = args[1];
                if (!amount && !tAmount) return message.channel.send(`You're giving them nothing..?`);
                let realAmount;
                if (tAmount.toLowerCase() === 'all') realAmount = sender.balance.purse;
                else if (!isNaN(amount)) realAmount = amount;
                else return message.channel.send(`That isn't a valid number.`);
                sender.balance.purse -= realAmount;
                receiver.balance.purse += realAmount;
                saveDB(sender).then(saveDB(receiver).then(() => {
                    message.channel.send(`Successfully gave $${realAmount} to ${user.tag}`);
                    if (sender.rep.nextRep <= Date.now() && realAmount >= 1000) {
                        message.channel.send(`${user} you can now add +1 rep to ${message.author}\nIf you would like to do so, do e-rep`);

                        const repFilter = repResponse => {
                            return repResponse.author.id === user.id && repResponse.content.toLowerCase().startsWith('e-rep') || repResponse.author.id === message.author.id && ['e-givemoney', 'e-give', 'e-give-money'].some(cmd => repResponse.content.toLowerCase().indexOf(cmd.toLowerCase()) >= 0);
                        }

                        message.channel.awaitMessages(repFilter, { max: 1 }).then(repCollected => {
                            let repMSG = repCollected.first();
                            if (repMSG.author.id === message.author.id) return;
                            else if (repMSG.author.id === user.id) {
                                sender.rep.amount += 1;
                                sender.rep.nextRep = Date.now()+43200000;
                                saveDB(sender).then(message.channel.send(`Successfully added a reputation point to ${message.author.tag}! They now have ${sender.rep.amount} reputation points!`));
                            }
                        });
                    }
                }));
            });
        });
    }
}