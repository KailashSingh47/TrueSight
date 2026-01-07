/**
 * logic.js
 * Heuristic checks for logical fallacies or contradictions.
 */

export function analyzeLogic(text) {
    const flags = [];
    const lower = text.toLowerCase();

    // Ad Hominem / Attack patterns (Simulated)
    // Looking for "You are X" or "They are X" followed by insults
    const insults = ['idiot', 'moron', 'liar', 'shill', 'clown', 'puppet'];
    const hasInsult = insults.some(word => lower.includes(word));

    if (hasInsult) {
        flags.push({
            type: 'Ad Hominem',
            severity: 'medium',
            description: 'Contains personal attacks or insults, which often substitute for actual counter-arguments.',
        });
    }

    // "What about"ism
    if (lower.includes('what about') || lower.includes('but what about')) {
        flags.push({
            type: 'Whataboutism',
            severity: 'low',
            description: 'Potential deflection using "What about..." structure to avoid the main topic.',
        });
    }

    // All Caps check (shouting)
    const allCapsParams = text.match(/[A-Z]{4,}/g);
    if (allCapsParams && allCapsParams.length > 2) {
        flags.push({
            type: 'Aggressive Formatting',
            severity: 'low',
            description: 'Excessive use of ALL CAPS, indicating aggression or urgency rather than logic.',
        });
    }

    let score = 100 - (flags.length * 15);
    score = Math.max(0, Math.min(100, score));

    return {
        score,
        flags
    };
}
