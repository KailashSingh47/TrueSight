/**
 * linguistic.js
    * Detects linguistic red flags like emotional manipulation and absolutes.
 */

const ABSOLUTES = [
    'always', 'never', 'everyone', 'nobody', 'perfect', 'completely', 'undeniable',
    '100%', 'proven', 'guaranteed', 'impossible', 'forever'
];

const EMOTIONAL_TRIGGERS = [
    'shocking', 'miracle', 'disaster', 'betrayal', 'secret', 'banned', 'censored',
    'destroy', 'panic', 'urged', 'begging', 'horrifying', 'incredible'
];

export function analyzeLinguistics(text) {
    const lower = text.toLowerCase();
    const flags = [];

    // Check for Absolutes
    const foundAbsolutes = ABSOLUTES.filter(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        return regex.test(lower);
    });

    if (foundAbsolutes.length > 0) {
        flags.push({
            type: 'Absolute Language',
            severity: 'medium',
            description: `Contains absolute terms (${foundAbsolutes.slice(0, 3).join(', ')}...) which typically oversimplify complex issues.`,
            matches: foundAbsolutes
        });
    }

    // Check for Emotional Manipulation
    const foundTriggers = EMOTIONAL_TRIGGERS.filter(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        return regex.test(lower);
    });

    if (foundTriggers.length > 0) {
        flags.push({
            type: 'Emotional Manipulation',
            severity: 'high',
            description: `Uses emotionally charged words (${foundTriggers.slice(0, 3).join(', ')}...) to bypass rational analysis.`,
            matches: foundTriggers
        });
    }

    // Calculate a basic "Objectivity Score" (inverted by red flags)
    // Base 100, minus 10 per absolute, minus 15 per trigger
    let score = 100 - (foundAbsolutes.length * 5) - (foundTriggers.length * 10);
    score = Math.max(0, Math.min(100, score));

    return {
        score,
        flags
    };
}
