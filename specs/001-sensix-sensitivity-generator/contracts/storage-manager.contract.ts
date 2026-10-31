/**
 * Contract: Local Storage Profile Manager
 * Module: my-app/lib/storage.ts
 */

import { SavedProfile, SensValues } from '../data-model';

export interface StorageManagerContract {
  /**
   * Retrieves all saved profiles from localStorage with schema validation.
   * Gracefully returns an empty array if storage is empty or corrupt.
   */
  loadProfiles(): SavedProfile[];

  /**
   * Saves a new profile to localStorage.
   * Throws an error or returns false if profile cap (100) is exceeded.
   */
  saveProfile(input: {
    name: string;
    label: string;
    values: SensValues;
  }): SavedProfile;

  /**
   * Deletes a profile by its UUID.
   */
  deleteProfile(id: string): boolean;

  /**
   * Generates a downloadable JSON string of all active profiles.
   */
  exportProfilesJson(): string;

  /**
   * Validates and merges an imported JSON string into existing profiles,
   * skipping duplicate IDs.
   */
  importProfilesJson(jsonString: string): {
    importedCount: number;
    skippedCount: number;
    totalCount: number;
  };
}
