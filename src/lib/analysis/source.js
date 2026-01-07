/**
 * source.js
 * (Prototype) Checks for source reliability indicators.
 * In a real app, this would query an API or large database.
 */

const SUSPICIOUS_DOMAINS = [
    'fakenews.com', 'conspiracy.net', 'realtruth.org', 'banned.video', 'clickbait.io'
];

const TRUSTED_DOMAINS = [
    'reuters.com', 'apnews.com', 'sciencedirect.com', 'nature.com'
];

export function analyzeSource(text) {
    const flags = [];
    let score = 50; // Neutral start if no source detected

    // Extract URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = text.match(urlRegex) || [];

    if (urls.length === 0) {
        return {
            score: 50,
            flags: [],
            details: 'No sources/links detected.'
        };
    }

    let suspiciousCount = 0;
    let trustedCount = 0;

    urls.forEach(url => {
        if (SUSPICIOUS_DOMAINS.some(domain => url.includes(domain))) {
            suspiciousCount++;
            flags.push({
                type: 'Unreliable Source',
                severity: 'high',
                description: `Link to known questionable domain: ${url}`,
            });
        }
        if (TRUSTED_DOMAINS.some(domain => url.includes(domain))) {
            trustedCount++;
        }
    });

    if (suspiciousCount > 0) {
        score = 20;
    } else if (trustedCount > 0) {
        score = 90;
    } else {
        score = 60; // Has links but unknown authority
    }

    return {
        score,
        flags,
        details: `Found ${urls.length} link(s).`
    };
}
