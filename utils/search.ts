export const processQuery = (q: string, urls: Record<string, string> = {}) => {
  if (q.startsWith("https://") || q.startsWith("http://")) return q;
  if (q.startsWith("!")) return `https://${q.slice(1)}`;
  if (q.toLowerCase().includes("@images"))
    return `https://www.google.com/search?hl=en&tbm=isch&q=${encodeURIComponent(
      q.replace(/@images/i, "").trim()
    )}`;
  if (/@youtube|@yt/i.test(q))
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(
      q.replace(/@youtube|@yt/i, "").trim()
    )}`;
  return urls[q] || `https://www.google.com/search?q=${encodeURIComponent(q)}`;
};
