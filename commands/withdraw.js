module.exports = {
    name: "withdraw",
    description: "Withdraw your money.",
    usage: '<amount/all>',
    category: "economy",

    code(client, message, args) {
        const { getDB } = client.functions.get('dbfind');
        const { saveDB } = client.functions.get('dbsave');

        getDB(message.author.id).then(res => {
            let amount = parseInt(args[0]);
            if (!amount) return message.channel.send(`You withdrew $0! Seriously..? Stop wasting my time please.`);
            let realAmount;
            if (amount.toLowerCase() === 'all') realAmount = res.balance.bank;
            else if (!isNaN(amount)) realAmount = amount;
            else return message.channel.send(`That isn't a valid number.`);
            res.balance.bank = res.balance.bank-realAmount;
            res.balance.purse = res.balance.purse+realAmount;
            saveDB(res).then(message.channel.send(`Successfully withdrew $${realAmount}! You now have $${res.balance.purse} in your purse, and $${res.balance.bank} left in your bank!`));
        });
    }
}