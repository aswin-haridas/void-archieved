import { useEffect, useState } from 'react';

export const useUrlFetcher = () => {
  const [urls, setUrls] = useState({});

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/aswin-haridas/Database/refs/heads/main/links.json')
      .then((res) => res.json())
      .then(setUrls)
      .catch((err) => console.error('Failed to fetch URLs:', err));
  }, []);

  return urls;
};
