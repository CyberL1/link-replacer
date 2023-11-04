import { Settings } from "../utils/settings.js";

export default {
  run: guild => new Settings(guild.id).remove(),
};
