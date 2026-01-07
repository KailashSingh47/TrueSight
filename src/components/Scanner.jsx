import React, { useState } from 'react';
import { validateInput, normalizeText, MAX_CHAR_LIMIT } from '../lib/scanner';
import { runAnalysisPipeline } from '../lib/analysis/pipeline';

export default function Scanner({ onAnalysisComplete }) {
    const [input, setInput] = useState('');
    const [error, setError] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    const handleScan = async () => {
        setError(null);
        const normalized = normalizeText(input);
        const validation = validateInput(normalized);

        if (!validation.isValid) {
            setError(validation.error);
            return;
        }

        setIsScanning(true);
        try {
            const result = await runAnalysisPipeline(normalized);
            onAnalysisComplete(normalized, result);
            setInput(''); // Clear after successful scan? Or keep it? keeping it might be better for UX.
            // Actually, let's keep it so they can edit.
        } catch (err) {
            setError('An error occurred during the analysis pipeline.');
            console.error(err);
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="glass-panel" style={{ marginBottom: '2rem' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Content Scanner</h2>

            <div style={{ position: 'relative' }}>
                <textarea
                    className="input-field"
                    rows={6}
                    placeholder="Paste article text, social media post, or statement here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isScanning}
                    style={{ resize: 'vertical', minHeight: '150px' }}
                />
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    fontSize: '0.8rem',
                    color: input.length > MAX_CHAR_LIMIT ? 'var(--color-accent)' : 'var(--color-text-muted)'
                }}>
                    {input.length} / {MAX_CHAR_LIMIT}
                </div>
            </div>

            {error && (
                <div style={{
                    color: 'var(--color-accent)',
                    marginTop: '0.5rem',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    ⚠️ {error}
                </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    className={`btn ${isScanning ? '' : 'btn-primary'}`}
                    onClick={handleScan}
                    disabled={isScanning}
                >
                    {isScanning ? 'Scanning...' : 'Analyze Content'}
                </button>
            </div>
        </div>
    );
}
