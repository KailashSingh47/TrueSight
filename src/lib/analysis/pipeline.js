/**
 * pipeline.js
 * Orchestrates the full analysis process.
 */

import { analyzeLinguistics } from './linguistic';
import { analyzeLogic } from './logic';
import { analyzeSource } from './source';

export async function runAnalysisPipeline(text) {
    // Simulate processing time for "AI" feel
    await new Promise(resolve => setTimeout(resolve, 800));

    const linguistics = analyzeLinguistics(text);
    const logic = analyzeLogic(text);
    const source = analyzeSource(text);

    // Calculate aggregate credibility score
    // Weighted: Linguistics (40%), Logic (30%), Source (30%)
    const aggregateScore = Math.round(
        (linguistics.score * 0.4) +
        (logic.score * 0.3) +
        (source.score * 0.3)
    );

    return {
        aggregateScore,
        breakdown: {
            linguistics,
            logic,
            source
        },
        timestamp: Date.now()
    };
}
