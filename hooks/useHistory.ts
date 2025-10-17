// History management using Supabase
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getSearchHistory, saveSearchQuery } from '../utils/supabaseHistory';

const MAX_HISTORY_ITEMS = 50;

export default function useHistory() {
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load history from Supabase on mount
  useEffect(() => {
    const loadHistory = async () => {
      try {
        const supabaseHistory = await getSearchHistory();
        setHistory(supabaseHistory);
      } catch (error) {
        console.error('Failed to load history from Supabase:', error);
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
      return [trimmedQuery, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
    });

    // Save to Supabase asynchronously
    try {
      const success = await saveSearchQuery(trimmedQuery);
      if (success) {
        // Refresh from Supabase to ensure consistency
        const updatedHistory = await getSearchHistory();
        if (updatedHistory.length > 0) {
          setHistory(updatedHistory);
        }
      }
    } catch (error) {
      console.error('Failed to save to Supabase:', error);
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
