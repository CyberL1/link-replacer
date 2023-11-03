export default {
  run: interaction => {
    let command = interaction.commandName;
    if (interaction.options._subcommand) command += ` ${interaction.options.getSubcommand()}`;

    const cmd = interaction.client.commands.get(command);
    if (!cmd) return;

    cmd(interaction);
  },
};
