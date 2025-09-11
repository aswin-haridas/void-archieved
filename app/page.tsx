"use client";

import { useEffect, useRef, useState } from "react";
import { SearchForm, PixelatedWave } from "../components";
import { useKeyboardNavigation, useUrlFetcher } from "../hooks";
import useAutocomplete from "../hooks/useAutocomplete";
import useThoughts from "../hooks/useThoughts";
import { handleDefaultSearch, processQuery } from "../utils/search";

export default function Home() {
  const [q, setQ] = useState("");
  const [selectedThought, setSelectedThought] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const urls = useUrlFetcher();
  const thoughts = useThoughts(q);
  const { suggestion, saveToHistory } = useAutocomplete(q);

  // Use the keyboard navigation hook
  useKeyboardNavigation(
    selectedThought,
    setSelectedThought,
    thoughts,
    inputRef,
    q,
    suggestion,
    setQ
  );

  // Focus input on initial load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedThought > 0) {
      const query = thoughts[selectedThought - 1];
      const url = handleDefaultSearch(query, urls);
      window.open(url, "_self");
      setSelectedThought(0);
      return;
    }

    if (!q.trim()) return;
    const query = q.trim().toLowerCase();
    saveToHistory(query);
    const url = processQuery(query, urls);
    window.open(url, "_self");
    setQ("");
  };

  const handleThoughtClick = (index: number) => {
    const query = thoughts[index];
    const url = handleDefaultSearch(query, urls);
    window.open(url, "_self");
    setSelectedThought(0);
  };

  const placeholder = "Search for something...";

  return (
    <>
      <PixelatedWave
        gridSize={24}
        dotSize={3}
        waveAmplitude={25}
        waveSpeed={0.001}
        opacity={0.4}
        color="#ffffff"
      />
      <SearchForm
        thoughts={thoughts}
        onSubmit={handleSubmit}
        inputRef={inputRef}
        suggestion={suggestion}
        placeholder={placeholder}
        query={q}
        onQueryInput={setQ}
        selectedThought={selectedThought}
        onThoughtClick={handleThoughtClick}
      />
    </>
  );
}
