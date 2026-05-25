import express from 'express';

import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder
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
    GatewayIntentBits.Guilds
  ]
});

const commands = [
  new SlashCommandBuilder()
    .setName('pedro')
    .setDescription('Falar com o assistente de RH')
    .addStringOption(option =>
      option
        .setName('mensagem')
        .setDescription('Sua pergunta')
        .setRequired(true)
    )
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

async function registerCommands() {

  try {

    console.log('Registrando slash commands...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log('Slash commands registrados.');

  } catch (error) {

    console.error(error);

  }

}

client.once('ready', async () => {

  console.log(`Bot online: ${client.user.tag}`);

  await registerCommands();

});

client.on('interactionCreate', async interaction => {

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'pedro') {

    const pergunta = interaction.options.getString('mensagem');

    await interaction.reply({
      content: `👋 Você perguntou:\n\n"${pergunta}"`,
      ephemeral: true
    });

  }

});

client.login(process.env.DISCORD_BOT_TOKEN);
