import { AttachmentBuilder } from "discord.js";
import { Settings } from "../../../utils/settings.js";

export default interaction => {
  const settings = new Settings(interaction.guild.id).get();

  const file = new AttachmentBuilder(Buffer.from(JSON.stringify(settings, null, 2)), { name: `settings-${interaction.guild.id}.json` });
  interaction.reply({ files: [file], ephemeral: true });
};
