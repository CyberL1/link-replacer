export const replaceLinks = (message, links) => {
  const match = /https?:\/\/\S+\.+[a-z]{2,6}\/[^>\s]*/g;
  const urls = [];

  for (const link of message.content.match(match)) {
    console.log(link);
    const { protocol, hostname, pathname } = new URL(link);

    if (Object.keys(links).includes(hostname)) {
      urls.push({ protocol, hostname, pathname });
    }
  }

  return urls;
};
