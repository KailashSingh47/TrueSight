import React, { useEffect, useState } from 'react';
import { getLedger, verifyHash } from '../lib/ledger';
import AnalyticsDashboard from './AnalyticsDashboard';

export default function TruthLedger({ refreshTrigger }) {
    const [history, setHistory] = useState([]);
    const [copiedId, setCopiedId] = useState(null);
    const [verifyingId, setVerifyingId] = useState(null);
    const [verificationResult, setVerificationResult] = useState({}); // { hash: 'valid' | 'invalid' }

    useEffect(() => {
        setHistory(getLedger());
    }, [refreshTrigger]);

    const copyHash = (hash) => {
        navigator.clipboard.writeText(hash);
        setCopiedId(hash);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleVerify = (hash) => {
        setVerifyingId(hash);
        // Simulate network verification delay
        setTimeout(() => {
            const isValid = verifyHash(hash);
            setVerificationResult(prev => ({ ...prev, [hash]: isValid ? 'valid' : 'invalid' }));
            setVerifyingId(null);
        }, 800);
    };

    return (
        <div className="glass-panel">
            <h2 style={{ marginBottom: '1rem', color: 'var(--color-secondary)' }}>Truth Ledger</h2>
            <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Immutable record of all analyses. Hashes ensure that results have not been tampered with.
            </p>

            <AnalyticsDashboard history={history} />

            {history.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-muted)' }}>
                    No records found. Run an analysis to populate the ledger.
                </div>
            ) : (
                <div style={{ maxHeight: '400px', overflowY: 'auto', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                        <thead style={{ position: 'sticky', top: 0, background: 'var(--color-bg-panel)', zIndex: 1 }}>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                                <th style={{ padding: '1rem', width: '20%' }}>Timestamp</th>
                                <th style={{ padding: '1rem', width: '30%' }}>Integrity Hash</th>
                                <th style={{ padding: '1rem', width: '20%' }}>Score</th>
                                <th style={{ padding: '1rem', width: '30%' }}>verification</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((record, idx) => (
                                <tr key={idx} style={{
                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                    transition: 'background 0.2s',
                                    fontSize: '0.9rem'
                                }}>
                                    <td style={{ padding: '1rem', color: 'var(--color-text-muted)' }}>
                                        {new Date(record.timestamp).toLocaleTimeString()} <br />
                                        <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{new Date(record.timestamp).toLocaleDateString()}</span>
                                    </td>
                                    <td style={{ padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                                        <span
                                            style={{
                                                color: 'var(--color-primary)',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                            onClick={() => copyHash(record.hash)}
                                            title="Click to copy hash"
                                        >
                                            {record.hash.substring(0, 8)}...{record.hash.substring(record.hash.length - 8)}
                                            {copiedId === record.hash && <span style={{ color: 'var(--color-success)', fontSize: '0.7rem' }}>Copied!</span>}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        <span style={{
                                            fontWeight: 'bold',
                                            color: record.analysis.aggregateScore >= 80 ? 'var(--color-success)' :
                                                record.analysis.aggregateScore >= 50 ? 'var(--color-warning)' : 'var(--color-accent)'
                                        }}>
                                            {record.analysis.aggregateScore}%
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {verificationResult[record.hash] === 'valid' ? (
                                            <span style={{ color: 'var(--color-success)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                ✓ Verified
                                            </span>
                                        ) : verificationResult[record.hash] === 'invalid' ? (
                                            <span style={{ color: 'var(--color-accent)', fontWeight: 'bold' }}>
                                                ⚠ Tampered
                                            </span>
                                        ) : (
                                            <button
                                                className="btn"
                                                style={{
                                                    padding: '0.3rem 0.8rem',
                                                    fontSize: '0.75rem',
                                                    minWidth: '80px'
                                                }}
                                                onClick={() => handleVerify(record.hash)}
                                                disabled={verifyingId === record.hash}
                                            >
                                                {verifyingId === record.hash ? 'Checking...' : 'Verify Hash'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
