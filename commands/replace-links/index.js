import { replaceLinks } from "../../utils/messages.js";

export default async (interaction) => {
  const channel = await interaction.client.channels.fetch(
    interaction.channelId,
  );

  const message = await channel.messages.fetch(interaction.targetId);

  if (!message.content) {
    return interaction.reply({
      content: "This message has no content",
      ephemeral: true,
    });
  }

  const replaced = replaceLinks(message, interaction.client.links);

  if (!replaced) {
    return interaction.reply({
      content: "No links to replace",
      ephemeral: true,
    });
  }

  const links = replaced
    .map(
      ({ protocol, hostname, pathname }) =>
        `<${protocol}//${hostname}${pathname}> -> ${protocol}//${interaction.client.links[hostname]}${pathname}`,
    )
    .join("\n");

  interaction.reply({ content: links });
};
