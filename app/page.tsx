'use client';

import { useEffect, useRef, useState } from 'react';
import { ProgressOverlay, SearchForm } from '../components';
import { useKeyboardNavigation, useUrlFetcher } from '../hooks';
import useAutocomplete from '../hooks/useAutocomplete';
import { handleDefaultSearch, processQuery } from '../utils/search';

export default function Home() {
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const urls = useUrlFetcher();
  const {
    suggestions,
    selectedIndex,
    setSelectedIndex,
    selectNext,
    selectPrevious,
    getSelectedSuggestion,
    saveToHistory,
  } = useAutocomplete(q);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (selectedIndex > 0 && suggestions.length > 0) {
      const selectedSuggestion = suggestions[selectedIndex - 1];
      if (selectedSuggestion) {
        await saveToHistory(selectedSuggestion.text);
        const url = handleDefaultSearch(selectedSuggestion.text, urls);
        window.open(url, '_self');
        setSelectedIndex(0);
        return;
      }
    }

    if (!q.trim()) return;
    const trimmedQuery = q.trim();
    // Preserve case for direct URLs, convert to lowercase for searches
    const query =
      trimmedQuery.startsWith('https://') || trimmedQuery.startsWith('http://')
        ? trimmedQuery
        : trimmedQuery.toLowerCase();
    await saveToHistory(query);
    const url = processQuery(query, urls);
    window.open(url, '_self');
    setQ('');
  };

  // Use the keyboard navigation hook
  useKeyboardNavigation(
    selectedIndex,
    setSelectedIndex,
    suggestions,
    inputRef,
    q,
    getSelectedSuggestion,
    setQ,
    handleSubmit
  );

  // Focus input on initial load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSuggestionClick = async (index: number) => {
    const selectedSuggestion = suggestions[index];
    if (selectedSuggestion) {
      await saveToHistory(selectedSuggestion.text);
      const url = handleDefaultSearch(selectedSuggestion.text, urls);
      window.open(url, '_self');
      setSelectedIndex(0);
    }
  };

  const placeholder = '';

  return (
    <>
      <ProgressOverlay />
      <SearchForm
        onSubmit={handleSubmit}
        inputRef={inputRef}
        suggestions={suggestions}
        selectedIndex={selectedIndex}
        selectNext={selectNext}
        selectPrevious={selectPrevious}
        getSelectedSuggestion={getSelectedSuggestion}
        placeholder={placeholder}
        query={q}
        onQueryInput={setQ}
        onSuggestionClick={handleSuggestionClick}
      />
    </>
  );
}
