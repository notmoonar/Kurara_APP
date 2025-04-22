const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides information about the server'),
    async execute(interaction: { reply: (arg0: {  content: string; ephemeral: true; }) => void; 
        guild: { name: any; 
        memberCount: any; 
        createdAt: any; 
        ownerId: any; 
        id: any; 
        iconURL: (arg0: { dynamic: boolean; }) => string; }; }) {
        interaction.reply({
            content: `${interaction.guild.name} server information:\n` +
                `- Member Count: ${interaction.guild.memberCount}\n` +
                `- Created At: ${interaction.guild.createdAt}\n` +
                `- Owner ID: ${interaction.guild.ownerId}\n` +
                `- Server ID: ${interaction.guild.id}\n` +
                `- Icon URL: ${interaction.guild.iconURL({ dynamic: true })}`,
            ephemeral: true
        });
        }
    };