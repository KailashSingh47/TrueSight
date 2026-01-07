import React from 'react';
import { downloadPDF } from '../lib/pdf';



export default function AnalysisPanel({ result }) {
    if (!result) return null;

    const { aggregateScore, breakdown, timestamp } = result;

    // Determine score color
    // Determine score color
    const getScoreColor = (score) => {
        if (score >= 80) return 'var(--color-success)';
        if (score >= 50) return 'var(--color-warning)';
        return 'var(--color-accent)';
    };

    const getVerdict = (score) => {
        if (score >= 80) return { label: 'High Credibility', color: 'var(--color-success)' };
        if (score >= 50) return { label: 'Review Needed', color: 'var(--color-warning)' };
        return { label: 'Potential Misinformation', color: 'var(--color-accent)' };
    };

    const getTopInsight = () => {
        const allFlags = [...breakdown.linguistics.flags, ...breakdown.logic.flags, ...breakdown.source.flags];
        if (allFlags.length === 0) return "Content checks passed. No significant red flags detected.";
        return `Main Issue: ${allFlags[0].type} - ${allFlags[0].description}`;
    };

    const verdict = getVerdict(aggregateScore);

    const ScoreRing = ({ score }) => (
        <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: `4px solid ${getScoreColor(score)}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: `0 0 20px ${getScoreColor(score)}40`
        }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: getScoreColor(score) }}>
                {score}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>CREDIBILITY</span>
        </div>
    );

    const FlagItem = ({ title, flags }) => (
        <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ marginBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.2rem' }}>
                {title} <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>({flags.length})</span>
            </h4>
            {flags.length === 0 ? (
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No significant issues detected.</p>
            ) : (
                <ul style={{ listStyle: 'none' }}>
                    {flags.map((flag, idx) => (
                        <li key={idx} style={{
                            marginBottom: '0.8rem',
                            padding: '0.8rem',
                            background: 'rgba(255, 0, 85, 0.1)',
                            borderLeft: '3px solid var(--color-accent)',
                            borderRadius: '0 4px 4px 0'
                        }}>
                            <div style={{ fontWeight: 'bold', color: 'var(--color-accent)' }}>{flag.type}</div>
                            <p style={{ fontSize: '0.9rem', marginTop: '0.2rem' }}>{flag.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className="glass-panel" style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--glass-border)' }}>
                <div style={{ paddingRight: '2rem', flex: 1 }}>
                    <h2 style={{ color: '#fff', marginBottom: '0.5rem' }}>Analysis Report</h2>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.4rem 1rem',
                        borderRadius: '4px',
                        border: `1px solid ${verdict.color}`,
                        color: verdict.color,
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        background: 'rgba(0,0,0,0.3)'
                    }}>
                        {verdict.label.toUpperCase()}
                    </div>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.5' }}>
                        {getTopInsight()}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', margin: 0 }}>ID: {timestamp}</p>
                        <button
                            onClick={() => downloadPDF(result)}
                            style={{
                                background: 'var(--color-primary)',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '0.4rem 0.8rem',
                                color: '#000',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                fontSize: '0.8rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            📄 Download Certificate
                        </button>
                    </div>
                </div>
                <ScoreRing score={aggregateScore} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <FlagItem
                    title="Linguistics"
                    flags={breakdown.linguistics.flags}
                />
                <FlagItem
                    title="Logic & Reasoning"
                    flags={breakdown.logic.flags}
                />
                <FlagItem
                    title="Source Reliability"
                    flags={breakdown.source.flags}
                />
            </div>

            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                * This analysis is heuristic-based and should not be taken as absolute truth. Always verify with multiple sources.
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
