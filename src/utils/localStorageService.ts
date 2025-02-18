/**
 * @param key - The key under which the data is stored.
 * @returns The parsed data or null if not found or on error.
 */
export function loadDataFromLocalStorage<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch (error) {
    console.error(
      `Error loading data from localStorage for key "${key}":`,
      error
    );
    return null;
  }
}

/**
 * @param key - The key under which to save the data.
 * @param data - The data to be saved.
 */
export function saveDataToLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving data to localStorage for key "${key}":`, error);
  }
}
