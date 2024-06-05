import "dotenv/config";
import { REST, Routes } from "discord.js";
import { readFile, readdir } from "node:fs/promises";

const commands = [];
const commandFiles = (
  await readdir("commands", { withFileTypes: true })
).filter((file) => file.isDirectory());

for (const file of commandFiles) {
  const data = JSON.parse(await readFile(`./commands/${file.name}/data.json`));

  data.integration_types = [1];
  data.contexts = [0, 1, 2];

  commands.push(data);
}

const rest = new REST().setToken(process.env.BOT_TOKEN);

try {
  console.log(`Started reloading ${commands.length} application (/) commands.`);
  const data = await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands },
  );
  console.log(`Successfully reloaded ${data.length} application (/) commands.`);
} catch (error) {
  console.error(error);
}
