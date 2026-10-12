async function defaultLinkShortener(longURL) {
  const query = new URLSearchParams({ url: longURL });
  const response = await fetch(`https://da.gd/shorten?${query}`);

  if (!response.ok) {
    throw new Error(`Shortener API returned HTTP ${response.status}.`);
  }

  const shortURL = (await response.text()).trim();
  let parsedShortURL;
  try {
    parsedShortURL = new URL(shortURL);
  } catch {
    throw new Error("Shortener API did not return a valid short URL.");
  }

  return parsedShortURL.href;
}

export { defaultLinkShortener };
