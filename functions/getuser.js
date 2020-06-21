function getUser(mention, client) {
    if (!mention) return;
    if (mention.startsWith('<@') && mention.endsWith('>')) {
        // if it is a mention it will do this
        mention = mention.slice(2, -1);
        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }
        return client.users.cache.get(mention);
    }
    else if (client.users.cache.get(mention)) {
        // if it is a id it will do this
        return client.users.cache.get(mention);
    } else {
        // if it isn't either of them it will do this
        if (client.users.cache.find(u => u.tag.toLowerCase().startsWith(mention.toLowerCase()))) {
            // if it can find a user from the input it will do this
            return client.users.cache.find(u => u.tag.toLowerCase().startsWith(mention.toLowerCase()));
        }
        else {
            // if not it wont do anything
            return;
        }
    }
}

module.exports = { name: "getuser", getUser }