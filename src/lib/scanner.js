/**
 * scanner.js
 * Handles text input normalization and basic validation.
 */

export const MAX_CHAR_LIMIT = 5000;
export const MIN_CHAR_LIMIT = 10;

/**
 * Normalizes input text by removing excessive whitespace.
 * @param {string} text 
 * @returns {string} normalized text
 */
export function normalizeText(text) {
  if (!text) return '';
  return text.trim().replace(/\s+/g, ' ');
}

/**
 * Validates the input text.
 * @param {string} text 
 * @returns {object} { isValid: boolean, error: string | null }
 */
export function validateInput(text) {
  if (!text || text.trim().length === 0) {
    return { isValid: false, error: 'Input cannot be empty.' };
  }
  
  const length = text.trim().length;
  if (length < MIN_CHAR_LIMIT) {
    return { isValid: false, error: `Text is too short (minimum ${MIN_CHAR_LIMIT} characters).` };
  }
  
  if (length > MAX_CHAR_LIMIT) {
    return { isValid: false, error: `Text exceeds limit of ${MAX_CHAR_LIMIT} characters.` };
  }

  return { isValid: true, error: null };
}
