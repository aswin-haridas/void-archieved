import { useEffect } from 'react';
import type { AutocompleteSuggestion } from './useAutocomplete';

export const useKeyboardNavigation = (
  selectedIndex: number,
  setSelectedIndex: (value: number | ((prev: number) => number)) => void,
  suggestions: AutocompleteSuggestion[],
  inputRef: React.RefObject<HTMLInputElement | null>,
  _query: string,
  getSelectedSuggestion: () => AutocompleteSuggestion | null,
  onQueryInput: (value: string) => void,
  onSubmit: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle arrow down - select next suggestion
      if (e.key === 'ArrowDown') {
        e.preventDefault(); // Prevent scroll
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      }

      // Handle arrow up - select previous suggestion
      if (e.key === 'ArrowUp') {
        e.preventDefault(); // Prevent scroll
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      }

      // Handle Tab key to accept suggestion
      if (e.keyCode === 9) {
        e.preventDefault(); // Prevent focus change
        const selectedSuggestion = getSelectedSuggestion();
        if (selectedSuggestion) {
          onQueryInput(selectedSuggestion.text);
        }
      }

      // Handle Enter key - submit form
      if (e.key === 'Enter') {
        e.preventDefault();
        onSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    selectedIndex,
    suggestions,
    setSelectedIndex,
    inputRef,
    getSelectedSuggestion,
    onQueryInput,
    onSubmit,
  ]);
};
