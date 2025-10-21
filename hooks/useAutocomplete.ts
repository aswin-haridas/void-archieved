import { useEffect, useState } from 'react';


export interface AutocompleteSuggestion {
  text: string;
  type: 'text';
}

export default function useAutocomplete(q: string) {
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);


  useEffect(() => {
    if (!q.trim()) {
      setSelectedIndex(0);
      return;
    }

    setSuggestions([]);
    setSelectedIndex(0);
  }, [q]);

  const selectNext = () => {
    setSelectedIndex((prev) => (prev + 1) % suggestions.length);
  };

  const selectPrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
  };

  const getSelectedSuggestion = () => {
    return suggestions[selectedIndex] || null;
  };

  return {
    suggestions,
    selectedIndex,
    setSelectedIndex,
    selectNext,
    selectPrevious,
    getSelectedSuggestion,

  };
}
