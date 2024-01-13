export const canDoWebhooks = message => {
  const perms = message.channel.permissionsFor(message.client.user.id).toArray();

  return perms.includes("ManageWebhooks") && perms.includes("ManageMessages");
};

export const replaceLinks = (message, links) => {
  const match = /https?:\/\/\S+\.+[a-z]{2,6}/g;
  const urls = [];

  if (!message.content.match(match)) return { urls: [], content: "" };
  for (const link of message.content.match(match)) {
    const { protocol, hostname, pathname } = new URL(link);

    if (!Object.keys(links).includes(hostname)) continue;
    urls.push({ protocol, hostname, pathname });
  }

  const content = message.content.replaceAll(match, url => Object.keys(links).includes(new URL(url).hostname) ? `${new URL(url).protocol}//${links[new URL(url).hostname]}` : url);

  return { urls, content };
};
