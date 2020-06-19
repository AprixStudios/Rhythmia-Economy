module.exports = {
    name: "monthly",
    description: "Get some monthly money!",
    usage: "",
    category: "economy",

    code(client, message, args) {
        const { getDB } = client.functions.get('dbfind');
        const { saveDB } = client.functions.get('dbsave');
        const { Time } = client.functions.get('timeget');

        getDB(message.author.id).then(res => {
            if (!res) return message.channel.send(`You have not started your life yet. Please do so by doing \`e-setup\``);
            let timeNow = Date.now();
            if (res.lastClaimed.monthly > timeNow) return message.channel.send(`You have already claimed this within the last 30 days.\nYou can claim this again in ${Time(res.lastClaimed.monthly-Date.now())}`);
            let income = Math.round(Math.random() * (4928 - 1727) + 1727);
            let timeNext = Date.now()+86400000*30;
            res.balance.purse = res.balance.purse+income;
            res.lastClaimed.monthly = timeNext;
            saveDB(res).then(message.channel.send(`You've just earned $${income}! You now have $${res.balance.purse+res.balance.bank} in your networth!`))
        });
    }
}