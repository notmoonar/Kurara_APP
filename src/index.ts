const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', (message: { content: string; channel: { send: (arg0: string) => void } }) => {
    if (message.content === '!ping') {  // Check if the message is "!ping"
        message.channel.send('Pong!')  // Reply with "Pong!"
    }});

client.login(process.env.DISCORD_BOT_TOKEN)