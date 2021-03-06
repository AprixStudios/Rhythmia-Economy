const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs-extra');
const mongoose = require('mongoose');
const MongoDB = require('mongodb');
const http = require('http');
const keepAlive = require(`./server.js`);

// Keep uptime
setInterval(() => {
    http.get('http://rhythmia-economy--aprixia.repl.co/');
}, 10000);

// Connect to db
mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@altricatiadb-${process.env.DBURL}/rhythmiaeconomy?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(console.log('Database Connected...'))
.catch(err => console.log(err));

// Function handler
client.functions = new Discord.Collection();

const functionFiles = fs.readdirSync('./functions').filter(file => file.endsWith('.js'));

for (const file of functionFiles) {
    const FunctionFile = require(`./functions/${file}`);
    client.functions.set(FunctionFile.name, FunctionFile);
}

// Command handlers
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.subcommands = new Discord.Collection();

const subCommandFiles = fs.readdirSync('./commands/subcommands').filter(file => file.endsWith('.js'));

for (const file of subCommandFiles) {
    const subCommand = require(`./commands/subcommands/${file}`);
    client.subcommands.set(subCommand.name, subCommand);
}

// Event handler
try {
    let eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
    for (i = 0; i < eventFiles.length; i++) {
        try {
            const event = require(`./events/${eventFiles[i]}`);
            client.on(eventFiles[i].slice(0, -3), event.bind(null, client));
        } catch (error) {
            return console.error(error);
        }
    }
} catch (error) {
    return console.error(error);
}

// Will put this in it's own file soon
client.on('ready', ready => {
    console.log(`Running!`);
});

// run express server and log in
keepAlive();
client.login(process.env.TOKEN);