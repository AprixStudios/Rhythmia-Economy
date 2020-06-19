module.exports = {
    name: "deposit",
    description: "Deposit all your money to keep it safe.",
    usage: '<amount/all>',
    category: "economy",
    aliases: ["dep"],

    code(client, message, args) {
        const { getDB } = client.functions.get('dbfind');
        const { saveDB } = client.functions.get('dbsave');

        getDB(message.author.id).then(res => {
            let amount = parseInt(args[0]);
            let tAmount = args[0];
            if (!amount && !tAmount) return message.channel.send(`You deposited $0! Seriously..? Stop wasting my time please.`);
            let realAmount;
            if (tAmount.toLowerCase() === 'all') realAmount = res.balance.purse;
            else if (!isNaN(amount)) realAmount = amount;
            else return message.channel.send(`That isn't a valid number.`);
            res.balance.bank = res.balance.bank+realAmount;
            res.balance.purse = res.balance.purse-realAmount;
            saveDB(res).then(message.channel.send(`Successfully deposited $${realAmount}! You now have $${res.balance.bank} in your bank, and $${res.balance.purse} left in your purse!`));
        });
    }
}