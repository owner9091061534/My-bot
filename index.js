const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

let userCash = new Map();
let userPray = new Map();

const hugGifs = [
    'https://media.giphy.com/media/3o7TKz9bX9C6Q8Q8Q/giphy.gif',
    'https://media.giphy.com/media/3o7TKz9bX9C6Q8Q8Q/giphy.gif' // Add more different GIFs
];
const kissGifs = [
    'https://media.giphy.com/media/3o7TKz9bX9C6Q8Q8Q/giphy.gif'
];
const slapGifs = [
    'https://media.giphy.com/media/3o7TKz9bX9C6Q8Q8Q/giphy.gif'
];

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('error', (error) => {
    console.error('Discord client error:', error);
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith('!hug')) {
        const target = message.mentions.users.first();
        if (!target) return message.reply('Mention a user to hug!');
        const gif = hugGifs[Math.floor(Math.random() * hugGifs.length)];
        const embed = new EmbedBuilder()
            .setTitle(`${message.author.username} hugs ${target.username}!`)
            .setImage(gif)
            .setColor('RANDOM');
        message.reply({ embeds: [embed] });
    } else if (message.content.startsWith('!kiss')) {
        const target = message.mentions.users.first();
        if (!target) return message.reply('Mention a user to kiss!');
        const gif = kissGifs[Math.floor(Math.random() * kissGifs.length)];
        const embed = new EmbedBuilder()
            .setTitle(`${message.author.username} kisses ${target.username}!`)
            .setImage(gif)
            .setColor('RANDOM');
        message.reply({ embeds: [embed] });
    } else if (message.content.startsWith('!slap')) {
        const target = message.mentions.users.first();
        if (!target) return message.reply('Mention a user to slap!');
        const gif = slapGifs[Math.floor(Math.random() * slapGifs.length)];
        const embed = new EmbedBuilder()
            .setTitle(`${message.author.username} slaps ${target.username}!`)
            .setImage(gif)
            .setColor('RANDOM');
        message.reply({ embeds: [embed] });
    } else if (message.content === '!pray') {
        const userId = message.author.id;
        const today = new Date().toISOString().split('T')[0];
        if (userPray.has(userId) && userPray.get(userId).date === today) {
            message.reply('Abe oi kiya? Pray pray kyu kar rha hai? Sirf ak bar pray karta hun din me . Tera chamcha nhi hu ma bhag yaha se.');
        } else {
            userPray.set(userId, { date: today, used: false });
            message.reply(`${message.author} You have one pray point you can play any game with me and you will won sure . {once per a day}`);
        }
    } else if (message.content === '!cash') {
        const userId = message.author.id;
        const cash = userCash.get(userId) || 1000;
        message.reply(`Your current cash: ${cash}`);
    } else if (message.content.startsWith('!flip ')) {
        const args = message.content.split(' ');
        const amount = parseInt(args[1]);
        if (isNaN(amount) || amount <= 0 || amount > 50000) return message.reply('Invalid amount. Max 50000.');
        const userId = message.author.id;
        let cash = userCash.get(userId) || 1000;
        if (cash < amount) return message.reply('Not enough cash.');
        const hasPray = userPray.has(userId) && !userPray.get(userId).used;
        const win = hasPray || Math.random() > 0.5;
        if (win) {
            cash += amount;
            if (hasPray) {
                userPray.get(userId).used = true;
            }
            message.reply(`You won! New cash: ${cash}`);
        } else {
            cash -= amount;
            message.reply(`You lost! New cash: ${cash}`);
        }
        userCash.set(userId, cash);
    } else if (message.content === '!ping') {
        message.reply('pong!');
    } else if (message.content === '!hello') {
        message.reply('Hello there!');
    } else if (message.content === '!bye') {
        message.reply('Goodbye!');
    } else if (message.content === '!help') {
        message.reply('Available commands: !ping, !hello, !bye, !help, !hug @user, !kiss @user, !slap @user, !pray, !cash, !flip <amount>');
    }
});

client.login(process.env.TOKEN).catch((error) => {
    console.error('Login failed:', error);
});