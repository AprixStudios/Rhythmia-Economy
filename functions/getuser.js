function getUser(mention, client) {
    if (!mention) return;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }
        return client.users.cache.get(mention);
    }
    else if (client.users.cache.get(mention)) {
        return client.users.cache.get(mention);
    } else {
        if (client.users.cache.find(u => u.tag.toLowerCase().startsWith(mention.toLowerCase()))) {
            return client.users.cache.find(u => u.tag.toLowerCase().startsWith(mention.toLowerCase()));
        }
        else {
            return;
        }
    }
}

module.exports = { name: "getuser", getUser }