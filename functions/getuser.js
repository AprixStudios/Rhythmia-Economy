function getUser(mention, client) {
    if (!mention) return;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention.slice(2, -1);
        if (mention.startsWith('!')) {
            mention.slice(1);
        }
        return client.users.cache.get(mention);
    }
    else if (client.users.cache.get(mention)) {
        return client.users.cache.get(mention);
    } else {
        if (client.users.cache.find(u => u.tag.startsWith(mention))) {
            return client.users.cache.find(u => u.tag.startsWith(mention));
        }
        else {
            return;
        }
    }
}

module.exports = { name: "getuser", getUser }