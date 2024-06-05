import { replaceLinks } from "../../utils/messages.js";

export default async (interaction) => {
  const channel = await interaction.client.channels.fetch(
    interaction.channelId,
  );
  const message = await channel.messages.fetch(interaction.targetId);

  const replaced = replaceLinks(message, interaction.client.links);
  console.log(replaced);

  const links = replaced
    .map(
      ({ protocol, hostname, pathname }) =>
        `<${protocol}//${hostname}${pathname}> -> ${protocol}//${interaction.client.links[hostname]}${pathname}`,
    )
    .join("\n");

  interaction.reply({ content: links });
};
