import { canDoWebhooks, replaceLinks } from "../utils/messages.js";
import { Settings } from "../utils/settings.js";
import { readFileSync } from "node:fs";

export default {
  run: async message => {
    if (message.author.bot) return;

    const settings = new Settings(message.guild.id);
    let { links } = settings.get();

    if (settings.get().defaultLinks) {
      const defaultLinks = JSON.parse(readFileSync("defaultLinks.json"));
      links = { ...defaultLinks, ...links };
    }

    const { urls, content } = replaceLinks(message, links);

    if (!urls.length || !content.length) return;

    if (!canDoWebhooks(message) && urls.length) {
      const replacedLinks = urls.map(({ protocol, hostname, pathname }) => {
        return `<${protocol}//${hostname}${pathname}> -> ${protocol}//${links[hostname]}${pathname}`;
      }).join("\n");

      return message.reply(replacedLinks).catch(console.error);
    }

    let webhook = (await (await (message.channel.fetchWebhooks())).filter(w => w.owner.id === message.client.user.id)).first();
    if (!webhook) webhook = await message.channel.createWebhook({ name: "Link replacer" });
    message.delete();

    webhook.send({ content, username: message.member.displayName, avatarURL: message.member.displayAvatarURL() });
  },
};
