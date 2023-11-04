import Database from "better-sqlite3";

const db = new Database("data.db");

export class Settings {
  constructor(guildId) {
    this.guildId = guildId;

    if (!db.prepare("SELECT * FROM guilds WHERE id = ?").get(guildId)) {
      db.prepare("INSERT INTO guilds (id, defaultLinks, links) VALUES (?, ?, ?)").run(guildId, 1, "{}");
    }
  }

  remove = () => db.prepare("DELETE FROM guilds WHERE id = ?").run(this.guildId);

  get = () => {
    const settings = db.prepare("SELECT * FROM guilds WHERE id = ?").get(this.guildId);
    settings.links = JSON.parse(settings.links);

    return settings;
  };

  toggleDefaultLinks = () => db.prepare(`UPDATE guilds SET defaultLinks = ${!this.get().defaultLinks} WHERE id = ?`).run(this.guildId);

  addLink = (oldLink, newLink) => {
    let { links } = db.prepare("SELECT links FROM guilds WHERE id = ?").get(this.guildId);
    links = JSON.parse(links);

    if (links[oldLink]) return false;
    links[oldLink] = newLink;

    db.prepare("UPDATE guilds SET links = ? WHERE id = ?").run(JSON.stringify(links), this.guildId);
    return true;
  };

  removeLink = (link) => {
    let { links } = db.prepare("SELECT links FROM guilds WHERE id = ?").get(this.guildId);
    links = JSON.parse(links);

    if (!links[link]) return false;
    delete links[link];

    db.prepare("UPDATE guilds SET links = ? WHERE id = ?").run(JSON.stringify(links), this.guildId);
    return true;
  };
}
