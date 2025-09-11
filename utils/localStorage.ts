/**
 * Utility functions for localStorage operations
 */

const LAST_SEARCH_QUERY_KEY = "lastSearchQuery";

/**
 * Store the last search query in localStorage
 */
export const storeLastSearchQuery = (query: string): void => {
  try {
    localStorage.setItem(LAST_SEARCH_QUERY_KEY, query);
  } catch (error) {
    console.warn("Failed to store search query in localStorage:", error);
  }
};

/**
 * Retrieve the last search query from localStorage
 */
export const getLastSearchQuery = (): string | null => {
  try {
    return localStorage.getItem(LAST_SEARCH_QUERY_KEY);
  } catch (error) {
    console.warn("Failed to retrieve search query from localStorage:", error);
    return null;
  }
};

/**
 * Clear the last search query from localStorage
 */
export const clearLastSearchQuery = (): void => {
  try {
    localStorage.removeItem(LAST_SEARCH_QUERY_KEY);
  } catch (error) {
    console.warn("Failed to clear search query from localStorage:", error);
  }
};
