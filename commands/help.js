const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "Get information about commands.",
    usage: '[commmand]',
    category: 'info',

    async code(client, message, args) {
        let command = args.slice(0).join(' ');
        if (!command) {
            let economy = client.commands.map(cmd => cmd).filter(cmd => cmd.category === 'economy');
            economy.forEach((z, x) => {
                economy[x] = z.name;
            });
            if (economy.length === 0) economy.push(`No commands yet.`);

            let roles = client.commands.map(cmd => cmd).filter(cmd => cmd.category === 'roles');
            roles.forEach((z, x) => {
                roles[x] = z.name;
            });
            if (roles.length === 0) roles.push(`No commands yet.`);

            let info = client.commands.map(cmd => cmd).filter(cmd => cmd.category === 'info');
            info.forEach((z, x) => {
                info[x] = z.name;
            });
            if (info.length === 0) info.push(`No commands yet.`);

            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#72da7e')
                .setTitle(`Available Commands`)
                .setDescription(`This bot is custom made by [AprixStudios](https://github.com/AprixStudios)`)
                .addField(`Economy`, economy.join('\n'), true)
                .addField(`Roles`, roles.join('\n'), true)
                .addField(`Info`, info.join('\n'), true)

            return message.channel.send(helpEmbed).catch(err => console.error(err));
        } else if (command) {
            if (!client.commands.get(command)) return message.channel.send(`This command does not exist.`);
            const cmd = client.commands.get(command)
            let aliases = "none";
            if (cmd.aliases) aliases = cmd.aliases.join(', ');
            const helpEmbed = new Discord.MessageEmbed()
            .setColor("#72da7e")
            .setTitle(cmd.name)
            .setDescription(`${cmd.description}`)
            .addField("Usage", `e-${cmd.name} ${cmd.usage}`)
            .addField("Aliases", `${aliases}`)
            await message.channel.send(helpEmbed).catch(err => console.error(err))
        }
    }
}