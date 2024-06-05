import "dotenv/config";
import { Client, Collection } from "discord.js";
import { readFile, readdir } from "node:fs/promises";

const client = new Client({ intents: [] });

client.links = JSON.parse(await readFile("links.json"));
client.commands = new Collection();

const eventFiles = (await readdir("events", { withFileTypes: true })).filter(
  (file) => file.isFile() && file.name.endsWith(".js"),
);

const commandFiles = (
  await readdir("commands", { withFileTypes: true })
).filter((file) => file.isDirectory());

for (const file of eventFiles) {
  const { default: event } = await import(`./events/${file.name}`);
  const eventName = file.name.split(".")[0];

  if (event.once) {
    client.once(eventName, event.run);
  } else {
    client.on(eventName, event.run);
  }
}

for (const dir of commandFiles) {
  const { default: command } = await import(`./commands/${dir.name}/index.js`);
  client.commands.set(dir.name, command);
}

client.login(process.env.BOT_TOKEN);
