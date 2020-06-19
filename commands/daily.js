module.exports = {
    name: "daily",
    description: "Get some daily money!",
    usage: "",
    category: "economy",

    code(client, message, args) {
        const { getDB } = client.functions.get('dbfind');
        const { saveDB } = client.functions.get('dbsave');
        const { Time } = client.functions.get('timeget');

        getDB(message.author.id).then(res => {
            if (!res) return message.channel.send(`You have not started your life yet. Please do so by doing \`e-setup\``);
            let timeNow = Date.now();
            if (res.lastClaimed.daily > timeNow) return message.channel.send(`You have already claimed this within the last 24 hours.\nYou can claim this again in ${Time(res.lastClaimed.daily-Date.now())}`);
            let income = Math.round(Math.random() * (78 - 34) + 34);
            let timeNext = Date.now()+86400000;
            res.balance.purse = res.balance.purse;
            res.lastClaimed.daily = timeNext;
            saveDB(res).then(message.channel.send(`You've just earned $${income}! You now have $${res.balance.purse+res.balance.bank} in your networth!`));
        });
    }
}