import { Settings } from "../../../utils/settings.js";

export default interaction => {
  const settings = new Settings(interaction.guild.id);
  settings.toggleDefaultLinks();

  interaction.reply({ content: `Link replacement ${settings.get().defaultLinks ? "will" : "will not"} include default links from now on`, ephemeral: true });
};
