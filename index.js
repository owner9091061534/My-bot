const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('error', (error) => {
    console.error('Discord client error:', error);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content === '!ping') {
        message.reply('pong!');
    } else if (message.content === '!hello') {
        message.reply('Hello there!');
    } else if (message.content === '!bye') {
        message.reply('Goodbye!');
    } else if (message.content === '!help') {
        message.reply('Available commands: !ping, !hello, !bye, !help');
    }
});

client.login(process.env.TOKEN).catch((error) => {
    console.error('Login failed:', error);
});