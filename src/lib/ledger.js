/**
 * ledger.js
 * Implements the "Truth Ledger" integrity layer using SHA-256 hashing.
 */

const STORAGE_KEY = 'truesight_ledger_v1';

/**
 * Generates a SHA-256 hash for the given analysis record.
 * Uses the Web Crypto API.
 * @param {string} text - Original input text
 * @param {number} timestamp - Analysis timestamp
 * @param {object} analysisResult - Result object
 * @returns {Promise<string>} Hex string of the hash
 */
export async function generateIntegrityHash(text, timestamp, analysisResult) {
    const data = JSON.stringify({ text, timestamp, summary: analysisResult });
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);

    // Convert buffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Saves a record to the local ledger.
 * @param {object} record 
 */
export function addToLedger(record) {
    const history = getLedger();
    // Prepend to keep newest first
    const updated = [record, ...history].slice(0, 50); // Keep last 50
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

/**
 * Retrieves the ledger history.
 * @returns {Array} List of past analyses
 */
export function getLedger() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

/**
 * Verifies if a record exists in the ledger with the same hash.
 * @param {string} hash 
 * @returns {boolean}
 */
export function verifyHash(hash) {
    const history = getLedger();
    return history.some(item => item.hash === hash);
}
