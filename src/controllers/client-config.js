const { Client, GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv');
const commandsLoader = require('./commands-loader');
const { loadEvents } = require('./events-loader');

//config environment variables
config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = commandsLoader;

loadEvents(client);

client.login(process.env.DISCORD_TOKEN);

module.exports = client;