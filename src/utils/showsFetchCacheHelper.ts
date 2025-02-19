import { Show } from "@/types";

const CACHE_KEY = "showsData";
const SYNC_KEY = "showsLastSync";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Retrieves cached shows from sessionStorage if the cache is still valid.
 * Otherwise, returns null.
 */
function getCachedShows(): Show[] | null {
  try {
    const cachedData = sessionStorage.getItem(CACHE_KEY);
    const lastSync = sessionStorage.getItem(SYNC_KEY);
    if (cachedData && lastSync) {
      const parsedData = JSON.parse(cachedData) as Show[];
      if (parsedData.length === 0) {
        clearCache();
        return null;
      }
      const lastSyncTime = Number(lastSync);
      if (Date.now() - lastSyncTime < CACHE_DURATION) {
        return parsedData;
      }
      clearCache();
    }
  } catch (error) {
    console.error("Error reading from sessionStorage:", error);
  }
  return null;
}

function setCachedShows(shows: Show[]): void {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(shows));
    sessionStorage.setItem(SYNC_KEY, Date.now().toString());
  } catch (error) {
    console.error("Error saving to sessionStorage:", error);
  }
}

function clearCache(): void {
  try {
    sessionStorage.removeItem(CACHE_KEY);
    sessionStorage.removeItem(SYNC_KEY);
  } catch (error) {
    console.error("Error clearing sessionStorage:", error);
  }
}

async function fetchPage(page: number): Promise<Show[]> {
  const response = await fetch(`https://api.tvmaze.com/shows?page=${page}`);
  if (!response.ok) {
    throw new Error(`Error fetching page ${page}: HTTP ${response.status}`);
  }
  return response.json();
}

/**
 * Fetch and caches the result in sessionStorage
 */
export async function fetchTwoPagesAndCache(): Promise<Show[]> {
  const cached = getCachedShows();
  if (cached) return cached;

  try {
    const [page0Data, page1Data] = await Promise.all([
      fetchPage(0),
      fetchPage(1),
    ]);
    const combinedData = [...page0Data, ...page1Data];
    setCachedShows(combinedData);
    return combinedData;
  } catch (error) {
    console.error("Error fetching initial pages:", error);
    throw error;
  }
}
