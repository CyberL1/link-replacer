export default {
  run: interaction => {
    let command = interaction.commandName;
    if (interaction.options._subcommand) command += ` ${interaction.options.getSubcommand()}`;

    const cmd = interaction.client.commands.get(command);
    if (!cmd) return;

    if (interaction.isAutocomplete()) {
      cmd.autocomplete(interaction);
    } else {
      if (!cmd.run) return cmd(interaction);
      cmd.run(interaction);
    }
  },
};
