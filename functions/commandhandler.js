const Discord = require('discord.js');

module.exports = {
    name: "commandhandler",

    async code(client, message, prefix) {
        if (message.channel.type === 'dm') return;
        if (!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) {
            // if it isn't a command it will check for a subcommand
            let subCommand = client.subcommands.get(commandName);
            if (!subCommand) return;
            try {
                subCommand.code(client, message, args);
            } catch (error) {
                return console.error(error);
            }
        } else {
            // but if it is a command it will do this
            try {
                command.code(client, message, args);
            } catch (error) {
                return console.error(error);
            }
        }
    }
}