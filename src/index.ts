const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { TOKEN } = require('./config.json');
const fs = require('fs');
const path = require('path');
const token = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const folderPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(folderPath).filter((file: string) => file.endsWith('.ts'));

client.commands = new Collection();

client.once(Events.ClientReady, (readyClient: { user: { tag: any; }; }) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

for (const folder of commandFiles) {
    const commandsPath = path.join(folderPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }

    }
}

client.on(Events.interactionCreate, async (interaction: {
    client: any;
    followUp(arg0: { content: string; ephemeral: boolean; }): unknown;
    deferred: any;
    replied: any;
    isChatInputCommand(): unknown; isCommand: () => any; commandName: any; reply: (arg0: { content: string; ephemeral: boolean; }) => void; 
}) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }


    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}:`, error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
    console.log(interaction);
});



client.login(TOKEN);