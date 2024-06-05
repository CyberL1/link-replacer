export default {
  run: (interaction) => {
    const command = interaction.commandName;
    const cmd = interaction.client.commands.get(command);

    if (cmd) {
      cmd(interaction);
    }
  },
};
