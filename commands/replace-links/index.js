import { replaceLinks } from "../../utils/messages.js";

export default async (interaction) => {
  if (interaction.targetMessage.author.id === interaction.client.user.id) {
    return interaction.reply({
      content: "You don't need to replace links twice",
      ephemeral: true,
    });
  }

  if (interaction.isMessageContextMenuCommand()) {
    if (!interaction.targetMessage.content) {
      return interaction.reply({
        content: "This message has no content",
        ephemeral: true,
      });
    }

    const replaced = replaceLinks(
      interaction.targetMessage,
      interaction.client.links,
    );

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
  }
};
