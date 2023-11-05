import { Settings } from "../../../utils/settings.js";

export default {
  run: interaction => {
    const link = interaction.options.getString("link");

    const settings = new Settings(interaction.guild.id);
    const success = settings.removeLink(link);

    if (!success) return interaction.reply({ content: "Link not found", ephemeral: true });

    interaction.reply({ content: "Link removed" });
  },
  autocomplete: interaction => {
    const value = interaction.options.getFocused();

    const settings = new Settings(interaction.guild.id);
    const { links } = settings.get();

    const result = Object.keys(links).filter(link => link.startsWith(value)).map(link => ({ name: link, value: link }));

    interaction.respond(result);
  },
};
