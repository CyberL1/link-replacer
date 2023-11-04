import { Settings } from "../../../utils/settings.js";

export default interaction => {
  const oldLink = interaction.options.getString("old_link");
  const newLink = interaction.options.getString("new_link");

  const linkRegexp = /https?:\/\//;

  if (!linkRegexp.test(oldLink) || !linkRegexp.test(newLink)) return interaction.reply({ content: "Links must begin with `http://` or `https://`", ephemeral: true });
  if (oldLink.includes(" ") || newLink.includes(" ")) return interaction.reply({ content: "Links cannot contain spaces", ephemeral: true });

  const settings = new Settings(interaction.guild.id);
  const success = settings.addLink(oldLink, newLink);

  if (!success) return interaction.reply({ content: "Link already exists", ephemeral: true });

  interaction.reply({ content: "Link added", ephemeral: true });
};
