import "dotenv/config";
import { Client } from "discord.js";
import { readFileSync } from "node:fs";

const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent"] });

const links = JSON.parse(readFileSync("links.json"));

client.once("ready", () => {
  client.user.setActivity(`${Object.keys(links).length} links`, { type: 3 });
  console.log(`${client.user.username} ready`);
});

client.on("messageCreate", message => {
  if (message.author.bot) return;

  const linksToReplace = [];
  const splitedMessage = message.content.replaceAll("\n", " ").split(/ +/g);

  splitedMessage.map(link => {
    Object.keys(links).map(domain => {
      if (!link.startsWith(`${domain}/`)) return;

      linksToReplace.push(link);
    });
  });


  if (!linksToReplace.length) return;

  const replacedLinks = linksToReplace.map(link => {
    const { protocol, hostname } = new URL(link);
    const domain = `${protocol}//${hostname}`;

    return `${link} -> ${link.replace(domain, links[domain])}`;
  }).join("\n");

  message.reply(`Replaced links (**${linksToReplace.length}**)\n${replacedLinks}`).catch(console.error);
});

client.login(process.env.BOT_TOKEN);
