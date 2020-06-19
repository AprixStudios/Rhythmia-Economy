module.exports = {
    name: "weekly",
    description: "Get some weekly money!",
    usage: "",
    category: "economy",

    code(client, message, args) {
        const { getDB } = client.functions.get('dbfind');
        const { saveDB } = client.functions.get('dbsave');
        const { Time } = client.functions.get('timeget');

        getDB(message.author.id).then(res => {
            if (!res) return message.channel.send(`You have not started your life yet. Please do so by doing \`e-setup\``);
            let timeNow = Date.now();
            if (res.lastClaimed.weekly > timeNow) return message.channel.send(`You have already claimed this within the last 7 days.\nYou can claim this again in ${Time(res.lastClaimed.weekly-Date.now())}`);
            let income = Math.round(Math.random() * (727 - 374) + 374);
            let timeNext = Date.now()+86400000*7;
            res.balance.purse = res.balance.purse+income;
            res.lastClaimed.weekly = timeNext;
            saveDB(res).then(message.channel.send(`You've just earned $${income}! You now have $${res.balance.purse+res.balance.bank} in your networth!`))
        });
    }
}