import { existsSync, rmSync } from "node:fs";
import Database from "better-sqlite3";
import { createInterface } from "node:readline";

if (existsSync("data.db")) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });

  const answer = await new Promise(p => {
    rl.question("Database file exists. Continuing may occur in data loss. Do you still with to continue? [Y/n] ", p);
  });

  if (["Y", "y"].includes(answer)) {
    rl.close();
    console.log("Recreating database.");
    rmSync("data.db");
  } else {
    console.log("Aborting.");
    process.exit();
  }
}

const db = new Database("data.db");

db.prepare("CREATE TABLE guilds (id TEXT, defaultLinks INT, links TEXT)").run();
