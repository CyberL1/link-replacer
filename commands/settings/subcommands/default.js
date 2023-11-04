import { Settings } from "../../../utils/settings.js";

export default interaction => {
  const settings = new Settings(interaction.guild.id);
  settings.toggleDefaultLinks();

  interaction.reply({ content: `Default links ${settings.get().defaultLinks ? "will" : "will not"} be replaced from now on` });
};
