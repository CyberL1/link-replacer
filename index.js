import "dotenv/config";
import { Client, Collection } from "discord.js";
import { readFile, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";

const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent"] });

client.links = JSON.parse(await (readFile("links.json")));
client.commands = new Collection();

const eventFiles = (await readdir("events", { withFileTypes: true })).filter(file => file.isFile() && file.name.endsWith(".js"));
const commandFiles = (await readdir("commands", { withFileTypes: true })).filter(file => file.isDirectory());

for (const file of eventFiles) {
  const { default: event } = await import(`./events/${file.name}`);
  const eventName = file.name.split(".")[0];

  if (event.once) client.once(eventName, event.run);
  else client.on(eventName, event.run);
}

for (const dir of commandFiles) {
  const hasSubcommands = existsSync(`./commands/${dir.name}/subcommands`) && (await stat(`./commands/${dir.name}/subcommands`)).isDirectory();

  if (hasSubcommands) {
    const subcommands = (await readdir(`./commands/${dir.name}/subcommands`, { withFileTypes: true })).filter(file => file.isFile() && file.name.endsWith(".js"));

    for (const file of subcommands) {
      const { default: subcommand } = await import(`./commands/${dir.name}/subcommands/${file.name}`);
      const subcommandName = file.name.split(".")[0];

      client.commands.set(`${dir.name} ${subcommandName}`, subcommand);
    }
  } else {
    const { default: command } = await import(`./commands/${dir.name}/index.js`);
    client.commands.set(dir.name, command);
  }
}

client.login(process.env.BOT_TOKEN);
