import { SEARCH_PREFIXES } from '../constants';

export const contains = (str = ' ', substr = ' ') => {
  return str.toLowerCase().includes(substr.toLowerCase());
};

export const isDirectNavigation = (query) => {
  return query.startsWith(SEARCH_PREFIXES.DIRECT);
};

export const isImageSearch = (query) => {
  return contains(query, SEARCH_PREFIXES.IMAGES);
};

export const isYoutubeSearch = (query) => {
  return SEARCH_PREFIXES.YOUTUBE.some((prefix) => contains(query, prefix));
};

export const handleDirectSiteNavigation = (query) => {
  const site = query.slice(1);
  return `https://${site}`;
};

export const handleImageSearch = (query) => {
  const searchTerm = query.replace(SEARCH_PREFIXES.IMAGES, '').trim();
  return `https://www.google.com/search?hl=en&tbm=isch&q=${encodeURIComponent(searchTerm)}`;
};

export const handleDefaultSearch = (query, customUrls = {}) => {
  return customUrls[query] || `https://www.google.com/search?q=${encodeURIComponent(query)}`;
};

export const handleYoutubeSearch = (query) => {
  const searchTerm = query.replace(new RegExp(SEARCH_PREFIXES.YOUTUBE.join('|'), 'i'), '').trim();

  return `https://www.youtube.com/results?search_query=${encodeURIComponent(searchTerm)}`;
};

export const processQuery = (query, customUrls = {}) => {
  if (isDirectNavigation(query)) {
    return handleDirectSiteNavigation(query);
  } else if (isImageSearch(query)) {
    return handleImageSearch(query);
  } else if (isYoutubeSearch(query)) {
    return handleYoutubeSearch(query);
  } else {
    return handleDefaultSearch(query, customUrls);
  }
};
