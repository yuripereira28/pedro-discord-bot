import { Client, GatewayIntentBits, Partials } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.once('ready', () => {
  console.log(`Bot online: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  if (!message.channel.isDMBased()) return;

  const userMessage = message.content.toLowerCase();

  if (userMessage === 'help') {
    await message.reply(
      'Olá! 👋 Sou o Pedro, assistente de Gente & Gestão.\n\nComo posso ajudar você hoje?'
    );
  } else {
    await message.reply(
      'Recebi sua mensagem! ✅'
    );
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
