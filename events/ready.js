export default {
  once: true,
  run: client => {
    client.user.setActivity(`${Object.keys(client.links).length} default links`, { type: 3 });
    console.log(`${client.user.username} ready`);
  },
};
