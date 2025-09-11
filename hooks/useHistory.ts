// Serverless history management using localStorage
import { useEffect, useState } from 'react';

const HISTORY_KEY = 'void-search-history';
const MAX_HISTORY_ITEMS = 50;

export default function useHistory() {
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(HISTORY_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Failed to load history from localStorage:', error);
    }
  }, []);

  const saveToHistory = (query) => {
    if (!query || !query.trim()) return;

    const trimmedQuery = query.trim().toLowerCase();

    setHistory((prevHistory) => {
      // Remove if already exists to avoid duplicates
      const filteredHistory = prevHistory.filter((item) => item !== trimmedQuery);

      // Add to beginning and limit size
      const newHistory = [trimmedQuery, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);

      // Save to localStorage
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('Failed to save history to localStorage:', error);
      }

      return newHistory;
    });
  };

  return {
    data: { history },
    saveToHistory,
  };
}
