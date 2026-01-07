import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

export default function AnalyticsDashboard({ history }) {
    if (!history || history.length === 0) return null;

    // 1. Prepare Data for Line Chart (Scores over Time) - Reverse to show oldest to newest
    // Take only the last 20 for readability
    const lineData = [...history].reverse().slice(-20).map(item => ({
        time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        score: item.analysis.aggregateScore
    }));

    // 2. Prepare Data for Pie Chart (Verdicts)
    const verdictCounts = history.reduce((acc, item) => {
        const score = item.analysis.aggregateScore;
        if (score >= 80) acc.high++;
        else if (score >= 50) acc.medium++;
        else acc.low++;
        return acc;
    }, { high: 0, medium: 0, low: 0 });

    const pieData = [
        { name: 'High Credibility', value: verdictCounts.high, color: 'var(--color-success)' },
        { name: 'Review Needed', value: verdictCounts.medium, color: 'var(--color-warning)' },
        { name: 'Misinformation', value: verdictCounts.low, color: 'var(--color-accent)' },
    ].filter(d => d.value > 0);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

            {/* Chart 1: Credibility Trend */}
            <div className="glass-panel" style={{ minHeight: '300px' }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>Credibility Trend</h3>
                <div style={{ width: '100%', height: '200px' }}>
                    <ResponsiveContainer>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                            <XAxis dataKey="time" stroke="var(--color-text-muted)" fontSize={12} />
                            <YAxis stroke="var(--color-text-muted)" domain={[0, 100]} fontSize={12} />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--color-bg-panel)', borderColor: 'var(--glass-border)', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Line type="monotone" dataKey="score" stroke="var(--color-primary)" strokeWidth={3} dot={{ fill: 'var(--color-primary)' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Chart 2: Verdict Distribution */}
            <div className="glass-panel" style={{ minHeight: '300px' }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-secondary)' }}>Analysis Distribution</h3>
                <div style={{ width: '100%', height: '200px' }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: 'var(--color-bg-panel)', borderColor: 'var(--glass-border)', color: '#fff' }}
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
