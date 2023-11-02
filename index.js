import "dotenv/config";
import { Client } from "discord.js";
import { readFileSync, readdirSync } from "node:fs";

const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent"] });

client.links = JSON.parse(readFileSync("links.json"));

const eventFiles = readdirSync("events").filter(file => file.endsWith(".js"));

for (const file of eventFiles) {
  const { default: event } = await import(`./events/${file}`);
  const eventName = file.split(".")[0];

  if (event.once) client.once(eventName, event.run);
  else client.on(eventName, event.run);
}

client.login(process.env.BOT_TOKEN);
