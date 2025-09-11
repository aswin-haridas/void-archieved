import { useEffect, useState } from 'react';
import useHistory from './useHistory';

export default function useAutocomplete(q) {
  const [suggestion, setSuggestion] = useState('');
  const { data, saveToHistory } = useHistory();

  useEffect(() => {
    if (!q.trim()) {
      setSuggestion('');
      return;
    }

    // Fuzzy search history for suggestions
    const lowerCaseQuery = q.trim().toLowerCase();

    // Filter history items that start with the query (more relevant for autocomplete)
    const exactMatches =
      data?.history?.filter((item) => item.toLowerCase().startsWith(lowerCaseQuery)) || [];

    // If no exact matches, look for items that include the query
    const partialMatches =
      data?.history?.filter(
        (item) =>
          item.toLowerCase().includes(lowerCaseQuery) &&
          !item.toLowerCase().startsWith(lowerCaseQuery)
      ) || [];

    // Prefer exact matches first
    const bestMatch = exactMatches[0] || partialMatches[0] || '';

    setSuggestion(bestMatch);
  }, [q, data]);

  return { suggestion, saveToHistory };
}
