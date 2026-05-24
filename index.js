import {
  Client,
  GatewayIntentBits,
  Partials
} from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel
  ]
});

client.on('ready', () => {
  console.log(`Bot online: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {

  try {

    // Ignora bots
    if (message.author.bot) return;

    // Aceita SOMENTE DM
    if (!message.channel.isDMBased()) return;

    console.log(
      `DM recebida de ${message.author.username}: ${message.content}`
    );

    await message.reply(
      `Olá ${message.author.username}! 👋\n\nRecebi sua mensagem:\n"${message.content}"`
    );

  } catch (error) {

    console.error('Erro ao responder DM:', error);

  }

});

client.login(process.env.DISCORD_BOT_TOKEN);
