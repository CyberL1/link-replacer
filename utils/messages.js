export const canDoWebhooks = message => {
  const perms = message.channel.permissionsFor(message.client.user.id).toArray();

  return perms.includes("ManageWebhooks") && perms.includes("ManageMessages");
};

export const replaceLinks = (message, links) => {
  let splitedMessage = "";

  if (canDoWebhooks(message)) splitedMessage = message.content.split(/ +/g);
  else splitedMessage = message.content.replaceAll("\n", " ").split(/ +/g);

  const urls = [];

  for (let i = 0; i < splitedMessage.length; i++) {
    let link;

    if (/https?:\/\//.test(splitedMessage[i])) {
      const { protocol, hostname, pathname } = new URL(splitedMessage[i]);
      splitedMessage[i] = `${protocol}//${hostname}${pathname}`;
      link = `${protocol}//${hostname}`;
    }

    if (/^https?:\/\//.test(splitedMessage[i]) && Object.keys(links).includes(link)) {
      const { pathname } = new URL(splitedMessage[i]);

      urls.push({ link, pathname });
      splitedMessage[i] = `${links[link]}${pathname}`;
    }
  }

  return canDoWebhooks(message) ? splitedMessage.join(" ") : urls;
};
