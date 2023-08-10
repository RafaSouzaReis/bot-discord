const { Client, Events, GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, bot => {
    console.log(`Ready! Logged in as ${bot.user.tag}`);
});

config();

client.login(process.env.DISCORD_TOKEN);