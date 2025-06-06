const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction: { reply: (arg0: { content: string; ephemeral: boolean; }) => void; }) {
        await interaction.reply({ content: 'Pong!', ephemeral: true });
    },
};