import { Settings } from "../../../utils/settings.js";

export default interaction => {
  const link = interaction.options.getString("link");

  const settings = new Settings(interaction.guild.id);
  const success = settings.removeLink(link);

  if (!success) return interaction.reply({ content: "Link not found", ephemeral: true });

  interaction.reply({ content: "Link removed" });
};
