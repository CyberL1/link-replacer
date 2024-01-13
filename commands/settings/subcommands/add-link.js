import { Settings } from "../../../utils/settings.js";

export default interaction => {
  const oldLink = interaction.options.getString("old_link");
  const newLink = interaction.options.getString("new_link");

  const linkRegexp = /^((?!-)[a-z-_]{1,63}(?<!-)\.)+[a-z]{2,6}$/m;

  if (!linkRegexp.test(oldLink) || !linkRegexp.test(newLink)) return interaction.reply({ content: "Links must only contain `[-, _, a-z, 0-9]` and be 1-63 charachters long (2-6 for TLD)", ephemeral: true });

  const settings = new Settings(interaction.guild.id);
  const success = settings.addLink(oldLink, newLink);

  if (!success) return interaction.reply({ content: "Link already exists", ephemeral: true });

  interaction.reply({ content: "Link added" });
};
