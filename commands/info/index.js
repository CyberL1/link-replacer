import { EmbedBuilder } from "discord.js";

export default interaction => {
  const embed = new EmbedBuilder()
    .setColor("DarkBlue")
    .setAuthor({ name: "Link replacer", iconURL: interaction.client.user.avatarURL() })
    .setDescription("Link replacer is a bot made for DDevs Buildathon 2023\nIt replaces links as the name implies")
    .setFooter({ text: "2023-2024" });

  interaction.reply({ embeds: [embed] });
};
