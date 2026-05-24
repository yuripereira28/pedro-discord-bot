import express from 'express';

import {
  Client,
  GatewayIntentBits,
  Partials
} from 'discord.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Pedro bot online!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor web ativo na porta ${PORT}`);
});

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

    if (message.author.bot) return;

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
