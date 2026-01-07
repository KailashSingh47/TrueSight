import React, { useState, useEffect } from 'react';
import { generateIntegrityHash, addToLedger } from '../lib/ledger';

export default function MediaScanner() {
    const [file, setFile] = useState(null);
    const [processingState, setProcessingState] = useState('idle'); // idle, uploading, analyzing, complete
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState([]);
    const [result, setResult] = useState(null);

    const addLog = (msg) => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setProcessingState('idle');
            setLogs([]);
            setResult(null);
        }
    };

    const startAnalysis = async () => {
        if (!file) return;

        setProcessingState('analyzing');
        setProgress(0);
        setLogs([]);
        addLog(`Initializing media pipeline for: ${file.name}`);

        // Simulation Sequence
        const steps = [
            { p: 10, msg: 'Extracting metadata...' },
            { p: 30, msg: 'Frame-by-frame decomposition...' },
            { p: 45, msg: 'Running physiological signal detection...' },
            { p: 60, msg: 'Analyzing audio frequency anomalies...' },
            { p: 80, msg: 'Cross-referencing deepfake signatures...' },
            { p: 90, msg: 'Finalizing credibility vector...' },
            { p: 100, msg: 'Analysis complete.' }
        ];

        for (let i = 0; i < steps.length; i++) {
            await new Promise(r => setTimeout(r, 800 + Math.random() * 500));
            setProgress(steps[i].p);
            addLog(steps[i].msg);
        }

        // Generate Mock Result
        const mockResult = {
            type: 'Deepfake Detection',
            score: Math.floor(Math.random() * 30) + 70, // Usually suspicious for demo
            details: 'Structural inconsistencies detected in facial landmarks.',
            timestamp: Date.now()
        };

        // Hash & Ledger
        const hash = await generateIntegrityHash(`MEDIA:${file.name}`, mockResult.timestamp, mockResult);
        addToLedger({
            hash,
            timestamp: mockResult.timestamp,
            analysis: { aggregateScore: mockResult.score, ...mockResult },
            preview: `[MEDIA] ${file.name}`
        });

        setResult(mockResult);
        setProcessingState('complete');
    };

    return (
        <div className="glass-panel" style={{ animation: 'fadeIn 0.5s' }}>
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-primary)' }}>Deep Media Intelligence</h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Advanced deepfake detection for video and audio content.
                <br />
                <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>* Running in Client-Side Simulation Mode</span>
            </p>

            {/* Upload Zone */}
            <div style={{
                border: '2px dashed var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                padding: '3rem',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.2)',
                marginBottom: '2rem',
                transition: 'all 0.3s'
            }}>
                <input
                    type="file"
                    id="media-upload"
                    style={{ display: 'none' }}
                    accept="video/*,audio/*,image/*"
                    onChange={handleFileSelect}
                />
                <label htmlFor="media-upload" className="btn" style={{ display: 'inline-block' }}>
                    {file ? 'Change Media' : 'Select File to Analyze'}
                </label>
                {file && (
                    <div style={{ marginTop: '1rem', color: 'var(--color-success)' }}>
                        Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                )}
            </div>

            {/* Action Button */}
            {file && processingState === 'idle' && (
                <div style={{ textAlign: 'right', marginBottom: '2rem' }}>
                    <button className="btn btn-primary" onClick={startAnalysis}>
                        Run Deep Scan
                    </button>
                </div>
            )}

            {/* Processing View */}
            {processingState !== 'idle' && (
                <div style={{ marginBottom: '2rem' }}>
                    {/* Progress Bar */}
                    <div style={{
                        height: '4px',
                        background: 'var(--glass-border)',
                        borderRadius: '2px',
                        marginBottom: '1rem',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            height: '100%',
                            width: `${progress}%`,
                            background: 'var(--color-primary)',
                            transition: 'width 0.3s ease'
                        }} />
                    </div>

                    {/* Terminal Log */}
                    <div style={{
                        background: '#000',
                        padding: '1rem',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        color: 'var(--color-text-muted)',
                        height: '150px',
                        overflowY: 'auto'
                    }}>
                        {logs.map((log, i) => (
                            <div key={i} style={{ marginBottom: '0.2rem' }}>{log}</div>
                        ))}
                        {processingState === 'analyzing' && (
                            <div style={{ animation: 'blink 1s infinite' }}>_</div>
                        )}
                    </div>
                </div>
            )}

            {/* Results */}
            {processingState === 'complete' && result && (
                <div style={{
                    background: 'rgba(255, 0, 85, 0.05)',
                    border: '1px solid var(--color-accent)',
                    borderRadius: 'var(--radius-md)',
                    padding: '2rem',
                    textAlign: 'center'
                }}>
                    <h3 style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>ANOMALIES DETECTED</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#fff' }}>
                        {result.score}%
                        <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>Fabrication Probability</span>
                    </div>
                    <p style={{ marginTop: '1rem' }}>{result.details}</p>
                </div>
            )}

            <style>{`
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
        </div>
    );
}
