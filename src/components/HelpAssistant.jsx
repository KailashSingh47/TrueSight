import React, { useState, useRef, useEffect } from 'react';

export default function HelpAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'system', text: 'TrueSight Guidance System online. How can I assist you?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg = inputValue.trim();
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInputValue('');

        // Simulated "AI" response delay
        setTimeout(() => {
            let response = "I'm not sure I understand. Try asking about 'scanning', 'integrity', or 'media'.";
            const lower = userMsg.toLowerCase();

            if (lower.includes('scan') || lower.includes('how to')) {
                response = "To analyze content, go to the 'Text Scanner' tab, paste your text, and click 'Analyze'. For video/audio, use the 'Media Intelligence' tab.";
            } else if (lower.includes('hash') || lower.includes('integrity') || lower.includes('ledger')) {
                response = "The Truth Ledger uses SHA-256 hashing to create an immutable ID for every scan. This ensures that past results cannot be tampered with silently.";
            } else if (lower.includes('fake') || lower.includes('media') || lower.includes('video')) {
                response = "Our Media Intelligence module detects deepfakes by analyzing physiological signals and compression anomalies. (Currently in simulation mode).";
            } else if (lower.includes('hello') || lower.includes('hi')) {
                response = "Greetings. I am the TrueSight internal guide. Query me for system operations.";
            }

            setMessages(prev => [...prev, { role: 'system', text: response }]);
        }, 600);
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    border: 'none',
                    boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)',
                    cursor: 'pointer',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    transition: 'transform 0.2s'
                }}
                className="chat-fab"
                title="Need Help?"
            >
                {isOpen ? '✕' : '?'}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="glass-panel"
                    style={{
                        position: 'fixed',
                        bottom: '7rem',
                        right: '2rem',
                        width: '350px',
                        height: '450px',
                        zIndex: 1000,
                        display: 'flex',
                        flexDirection: 'column',
                        animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: '1rem',
                        borderBottom: '1px solid var(--glass-border)',
                        background: 'rgba(0,0,0,0.2)',
                        borderTopLeftRadius: 'var(--radius-md)',
                        borderTopRightRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <div style={{ width: '8px', height: '8px', background: 'var(--color-success)', borderRadius: '50%' }} />
                        <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>System Guide</span>
                    </div>

                    {/* Messages */}
                    <div style={{
                        flex: 1,
                        padding: '1rem',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                style={{
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    background: msg.role === 'user' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                    border: msg.role === 'user' ? '1px solid var(--color-primary)' : '1px solid var(--glass-border)',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    maxWidth: '80%',
                                    fontSize: '0.85rem',
                                    color: msg.role === 'user' ? '#fff' : 'var(--color-text-muted)'
                                }}
                            >
                                {msg.text}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>

                    {/* Input */}
                    <div style={{
                        padding: '1rem',
                        borderTop: '1px solid var(--glass-border)',
                        display: 'flex',
                        gap: '0.5rem'
                    }}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask for help..."
                            style={{
                                flex: 1,
                                background: 'rgba(0,0,0,0.3)',
                                border: 'none',
                                color: '#fff',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                outline: 'none',
                                fontFamily: 'var(--font-mono)',
                                fontSize: '0.8rem'
                            }}
                        />
                        <button
                            onClick={handleSend}
                            style={{
                                background: 'var(--color-primary)',
                                border: 'none',
                                borderRadius: '4px',
                                width: '30px',
                                cursor: 'pointer',
                                color: '#000',
                                fontWeight: 'bold'
                            }}
                        >
                            ➜
                        </button>
                    </div>
                </div>
            )}

            <style>{`
        .chat-fab:active { transform: scale(0.9); }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
        </>
    );
}
