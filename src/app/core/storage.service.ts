import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  /**
   * Safely retrieves a value from localStorage.
   * Prevents crash in SSR or strict privacy/incognito modes.
   * @param key The key to retrieve.
   */
  getItem(key: string): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        return localStorage.getItem(key);
      } catch (error) {
        console.warn(`StorageService: failed to read key "${key}" from localStorage.`, error);
      }
    }
    return null;
  }

  /**
   * Safely sets a value in localStorage.
   * Prevents crash in SSR or strict privacy/incognito modes.
   * @param key The key to set.
   * @param value The string value to store.
   */
  setItem(key: string, value: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        console.warn(`StorageService: failed to set key "${key}" in localStorage.`, error);
      }
    }
  }
}
