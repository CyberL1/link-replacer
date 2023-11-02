import "dotenv/config";
import { Client } from "discord.js";

const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent"] });

client.once("ready", () => {
  console.log(`${client.user.username} ready`);
});

client.on("messageCreate", message => {
  if (message.author.bot) return;

  console.log(message.content);
});

client.login(process.env.BOT_TOKEN);
