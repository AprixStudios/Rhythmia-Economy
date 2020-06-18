const Discord = require('discord.js');

module.exports = {
    name: "commandhandler",

    async code(client, message, prefix) {
        if (message.channel.type === 'dm') return;
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            let subCommand = client.subcommands.get(commandName);
            if (!subCommand) return;
            try {
                subCommand.code(client, message, args);
            } catch (error) {
                return console.error(error);
            }
        } else {
            try {
                command.code(client, message, args);
            } catch (error) {
                return console.error(error);
            }
        }
    }
}