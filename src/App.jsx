import React, { useState } from 'react';
import Scanner from './components/Scanner';
import AnalysisPanel from './components/AnalysisPanel';
import TruthLedger from './components/TruthLedger';
import MediaScanner from './components/MediaScanner';
import WelcomeScreen from './components/WelcomeScreen';
import HelpAssistant from './components/HelpAssistant';
import { generateIntegrityHash, addToLedger } from './lib/ledger';

function App() {
  const [appState, setAppState] = useState('welcome'); // welcome, active
  const [currentResult, setCurrentResult] = useState(null);
  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner', 'media', 'ledger'
  const [ledgerUpdate, setLedgerUpdate] = useState(0);

  const handleAnalysisComplete = async (text, result) => {
    // Generate Hash
    const hash = await generateIntegrityHash(text, result.timestamp, result);

    const record = {
      hash,
      timestamp: result.timestamp,
      analysis: result,
      // We don't store full text in ledger preview for brevity, but would in a real DB
      preview: text.substring(0, 100) + '...'
    };

    addToLedger(record);
    setLedgerUpdate(prev => prev + 1);
    setCurrentResult(result);
  };

  const NavItem = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      style={{
        background: 'none',
        border: 'none',
        borderBottom: activeTab === id ? '2px solid var(--color-primary)' : '2px solid transparent',
        color: activeTab === id ? 'var(--color-primary)' : 'var(--color-text-muted)',
        padding: '1rem 0.5rem',
        marginRight: '2rem',
        fontSize: '1.1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
    >
      {label}
    </button>
  );

  if (appState === 'welcome') {
    return <WelcomeScreen onEnter={() => setAppState('active')} />;
  }

  return (
    <div className="container" style={{ animation: 'fadeIn 1s ease' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ marginBottom: '0.2rem' }}>TrueSight</h1>
          <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            AI-POWERED CREDIBILITY ANALYSIS ENGINE
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Status</div>
          <div style={{ color: 'var(--color-success)', fontWeight: 'bold' }}>SYSTEM ONLINE</div>
        </div>
      </header>

      <nav style={{ marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)' }}>
        <NavItem id="scanner" label="TEXT SCANNER" />
        <NavItem id="media" label="MEDIA INTELLIGENCE" />
        <NavItem id="ledger" label="TRUTH LEDGER" />
      </nav>

      <main>
        {activeTab === 'scanner' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Scanner onAnalysisComplete={handleAnalysisComplete} />
            {currentResult && <AnalysisPanel result={currentResult} />}
          </div>
        )}

        {activeTab === 'media' && (
          <MediaScanner />
        )}

        {activeTab === 'ledger' && (
          <TruthLedger refreshTrigger={ledgerUpdate} />
        )}
      </main>

      <footer style={{ marginTop: '4rem', padding: '2rem 0', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.8rem', borderTop: '1px solid var(--glass-border)' }}>
        <p>TrueSight v1.0.0 • Integrity Layer: SHA-256 • Heuristic Engine</p>
        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', fontSize: '0.9rem' }}>
          <a href="mailto:sathikailashsingh@gmail.com" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--color-primary)'} onMouseOut={e => e.target.style.color = 'var(--color-text-muted)'}>Contact</a>
          <a href="https://github.com/KailashSingh47" target="_blank" rel="noreferrer" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--color-primary)'} onMouseOut={e => e.target.style.color = 'var(--color-text-muted)'}>GitHub</a>
          <a href="https://www.linkedin.com/in/kailash-singh-47sk" target="_blank" rel="noreferrer" style={{ color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--color-primary)'} onMouseOut={e => e.target.style.color = 'var(--color-text-muted)'}>LinkedIn</a>
        </div>
      </footer>
      <HelpAssistant />
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}

export default App;
