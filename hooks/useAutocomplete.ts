import { useEffect, useState } from "react";
import useHistory from "./useHistory";

export interface AutocompleteSuggestion {
  text: string;
  type: "text";
}

export default function useAutocomplete(q: string) {
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data, saveToHistory } = useHistory();

  useEffect(() => {
    if (!q.trim()) {
      setSelectedIndex(0);
      return;
    }

    // Fuzzy search history for suggestions
    const lowerCaseQuery = q.trim().toLowerCase();

    // Filter history items that start with the query (more relevant for autocomplete)
    const exactMatches =
      data?.history?.filter((item) =>
        item.toLowerCase().startsWith(lowerCaseQuery)
      ) || [];

    // If no exact matches, look for items that include the query
    const partialMatches =
      data?.history?.filter(
        (item) =>
          item.toLowerCase().includes(lowerCaseQuery) &&
          !item.toLowerCase().startsWith(lowerCaseQuery)
      ) || [];

    // Combine and create suggestions
    const textSuggestions: AutocompleteSuggestion[] = [
      ...exactMatches,
      ...partialMatches,
    ]
      .slice(0, 5)
      .map((text) => ({ text, type: "text" as const }));

    // Use only text suggestions from history
    const allSuggestions = textSuggestions.slice(0, 8);

    setSuggestions(allSuggestions);
    setSelectedIndex(0);
  }, [q, data]);

  const selectNext = () => {
    setSelectedIndex((prev) => (prev + 1) % suggestions.length);
  };

  const selectPrevious = () => {
    setSelectedIndex(
      (prev) => (prev - 1 + suggestions.length) % suggestions.length
    );
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
    saveToHistory,
  };
}
