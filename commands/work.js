module.exports = {
    name: "work",
    description: "Work a bit!",
    usage: "",
    category: "economy",

    code(client, message, args) {
        const { getDB } = client.functions.get('dbfind');
        const { saveDB } = client.functions.get('dbsave');
        const { Time } = client.functions.get('timeget');

        getDB(message.author.id).then(res => {
            if (!res) return message.channel.send(`You have not started your life yet. Please do so by doing \`e-setup\``);
            let timeNow = Date.now();
            if (res.lastClaimed.work > timeNow) return message.channel.send(`You have already claimed this within the last 5 minutes.\nYou can claim this again in ${Time(res.lastClaimed.work-Date.now())}`);
            let income = Math.round(Math.random() * (23 - 2) + 2);
            let timeNext = Date.now()+300000;
            res.balance.purse += income;
            res.lastClaimed.work = timeNext;
            saveDB(res).then(message.channel.send(`You've just earned $${income}! You now have $${res.balance.purse+res.balance.bank} in your networth!`));
        });
    }
}