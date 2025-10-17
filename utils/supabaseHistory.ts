import { supabase } from '../lib/supabase';

const SEARCH_HISTORY_TABLE = 'search_history';
const MAX_HISTORY_ITEMS = 50;

export const getSearchHistory = async (): Promise<string[]> => {
  try {
    const { data, error } = await supabase
      .from(SEARCH_HISTORY_TABLE)
      .select('query, created_at')
      .order('created_at', { ascending: false })
      .limit(MAX_HISTORY_ITEMS);

    if (error) {
      console.error('Failed to fetch search history from Supabase:', error);
      return [];
    }

    return data?.map((item) => item.query) || [];
  } catch (error) {
    console.error('Failed to fetch search history from Supabase:', error);
    return [];
  }
};

/**
 * Save search query to Supabase
 */
export const saveSearchQuery = async (query: string): Promise<boolean> => {
  if (!query || !query.trim()) return false;

  const trimmedQuery = query.trim().toLowerCase();

  try {
    // First, check if this query already exists and delete it to avoid duplicates
    await supabase.from(SEARCH_HISTORY_TABLE).delete().eq('query', trimmedQuery);

    // Insert the new query
    const { error } = await supabase.from(SEARCH_HISTORY_TABLE).insert([
      {
        query: trimmedQuery,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Failed to save search query to Supabase:', error);
      return false;
    }

    // Clean up old entries to maintain max limit
    await cleanupOldEntries();

    return true;
  } catch (error) {
    console.error('Failed to save search query to Supabase:', error);
    return false;
  }
};

/**
 * Clean up old entries to maintain the maximum limit
 */
const cleanupOldEntries = async (): Promise<void> => {
  try {
    // Get all entries ordered by created_at desc
    const { data, error } = await supabase
      .from(SEARCH_HISTORY_TABLE)
      .select('id, created_at')
      .order('created_at', { ascending: false });

    if (error || !data) return;

    // If we have more than the max, delete the oldest ones
    if (data.length > MAX_HISTORY_ITEMS) {
      const idsToDelete = data.slice(MAX_HISTORY_ITEMS).map((item) => item.id);

      await supabase.from(SEARCH_HISTORY_TABLE).delete().in('id', idsToDelete);
    }
  } catch (error) {
    console.error('Failed to cleanup old search history entries:', error);
  }
};

/**
 * Clear all search history
 */
export const clearSearchHistory = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.from(SEARCH_HISTORY_TABLE).delete().gte('id', 0); // Delete all rows

    if (error) {
      console.error('Failed to clear search history from Supabase:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to clear search history from Supabase:', error);
    return false;
  }
};
