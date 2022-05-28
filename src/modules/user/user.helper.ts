import { VALID_UPDATES } from './user.model';

/**
 * Checks whether the update operation should be allowed or not
 * @param updates Array of the user's fields to update
 */
export const isValidUpdate = (updates: string[]) =>
  updates.every((update) => VALID_UPDATES.includes(update));
