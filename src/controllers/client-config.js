const { Client, Events, GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv');
const commandsLoader = require('./commands-loader');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, bot => {
    console.log(`Ready! Logged in as ${bot.user.tag}`);
});

//config environment variables
config();

client.commands = commandsLoader;

client.login(process.env.DISCORD_TOKEN);

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);

    if(!command){
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try{
        await command.execute(interaction);
    }catch(error){
        console.error(error);
        if(interaction.replied || interaction.deferred){
            await interaction. followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        }else{
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        }
    }
});

module.exports = client;