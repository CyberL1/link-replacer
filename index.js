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

  console.log(message.content);
});

client.login(process.env.BOT_TOKEN);
