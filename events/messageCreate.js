export default {
  run: async message => {
    if (message.author.bot) return;

    const { links } = message.client;

    const linksToReplace = [];
    const splitedMessage = message.content.replaceAll("\n", " ").split(/ +/g);

    splitedMessage.map(link => {
      Object.keys(links).map(domain => {
        if (!link.startsWith(`${domain}/`)) return;

        linksToReplace.push(link);
      });
    });

    if (!linksToReplace.length) return;

    const perms = message.channel.permissionsFor(message.client.user.id).toArray();

    if (!perms.includes("ManageWebhooks") || !perms.includes("ManageMessages")) {
      const replacedLinks = linksToReplace.map(link => {
        const { protocol, hostname } = new URL(link);
        const domain = `${protocol}//${hostname}`;

        return `<${link}> -> ${link.replace(domain, links[domain])}`;
      }).join("\n");

      return message.reply(replacedLinks).catch(console.error);
    }

    let webhook = (await (await (message.channel.fetchWebhooks())).filter(w => w.owner.id === message.client.user.id)).first();
    if (!webhook) webhook = await message.channel.createWebhook({ name: "Link replacer" });

    let content = message.content;

    splitedMessage.map(() => {
      Object.keys(links).map(domain => {
        content = content.replace(domain, links[domain]);
      });
    });

    message.delete();

    webhook.send({ content, username: message.member.displayName, avatarURL: message.member.displayAvatarURL() });
  },
};
