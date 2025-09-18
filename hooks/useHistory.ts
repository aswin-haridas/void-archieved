// History management using Supabase with localStorage fallback
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSearchHistory, saveSearchQuery } from '../utils/supabaseHistory';

const HISTORY_KEY = 'void-search-history';
const MAX_HISTORY_ITEMS = 50;

export default function useHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load history from Supabase on mount, fallback to localStorage
  useEffect(() => {
    const loadHistory = async () => {
      try {
        // Try to load from Supabase first
        const supabaseHistory = await getSearchHistory();

        if (supabaseHistory.length > 0) {
          setHistory(supabaseHistory);
        } else {
          // Fallback to localStorage if Supabase returns empty or fails
          const savedHistory = localStorage.getItem(HISTORY_KEY);
          if (savedHistory) {
            const localHistory = JSON.parse(savedHistory);
            setHistory(localHistory);

            // Migrate localStorage data to Supabase
            if (localHistory.length > 0) {
              // Save each item to Supabase (in reverse order to maintain chronology)
              for (const query of [...localHistory].reverse()) {
                await saveSearchQuery(query);
              }
              // Reload from Supabase after migration
              const migratedHistory = await getSearchHistory();
              if (migratedHistory.length > 0) {
                setHistory(migratedHistory);
              }
            }
          }
        }
      } catch (error) {
        console.error('Failed to load history:', error);
        // Fallback to localStorage only
        try {
          const savedHistory = localStorage.getItem(HISTORY_KEY);
          if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
          }
        } catch (localError) {
          console.error('Failed to load history from localStorage:', localError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadHistory();
  }, []);

  const saveToHistory = useCallback(async (query: string) => {
    if (!query || !query.trim()) return;

    const trimmedQuery = query.trim().toLowerCase();

    // Update local state immediately for better UX
    setHistory((prevHistory) => {
      // Remove if already exists to avoid duplicates
      const filteredHistory = prevHistory.filter((item) => item !== trimmedQuery);

      // Add to beginning and limit size
      const newHistory = [trimmedQuery, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);

      // Save to localStorage as backup
      try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      } catch (error) {
        console.error('Failed to save history to localStorage:', error);
      }

      return newHistory;
    });

    // Save to Supabase asynchronously
    try {
      const success = await saveSearchQuery(trimmedQuery);
      if (success) {
        // Optionally refresh from Supabase to ensure consistency
        const updatedHistory = await getSearchHistory();
        if (updatedHistory.length > 0) {
          setHistory(updatedHistory);
        }
      }
    } catch (error) {
      console.error('Failed to save to Supabase, falling back to localStorage only:', error);
    }
  }, []);

  return useMemo(
    () => ({
      data: { history },
      saveToHistory,
      isLoading,
    }),
    [history, isLoading, saveToHistory]
  );
}
