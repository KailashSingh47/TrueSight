import React, { useState } from 'react';

export default function WelcomeScreen({ onEnter }) {
    const [stage, setStage] = useState('idle'); // idle, loading

    const handleEnter = () => {
        setStage('loading');
        // Simulate system boot-up
        setTimeout(() => {
            onEnter();
        }, 2500);
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'var(--color-bg-deep)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            transition: 'opacity 0.5s',
        }}>
            {/* Animated Background Mesh */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none'
            }} />

            {stage === 'idle' && (
                <div style={{ textAlign: 'center', animation: 'fadeIn 1s' }}>
                    {/* Fun Clickable Icon - "The Eye of Truth" */}
                    <div
                        onClick={handleEnter}
                        style={{
                            width: '120px',
                            height: '120px',
                            margin: '0 auto 2rem',
                            borderRadius: '50%',
                            border: '2px solid var(--color-primary)',
                            boxShadow: '0 0 30px var(--color-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            background: 'rgba(0,0,0,0.5)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'scale(1.1)';
                            e.currentTarget.style.boxShadow = '0 0 50px var(--color-primary), inset 0 0 20px var(--color-primary)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 0 30px var(--color-primary)';
                        }}
                    >
                        {/* Inner Pupil */}
                        <div style={{
                            width: '40px',
                            height: '40px',
                            background: '#fff',
                            borderRadius: '50%',
                            boxShadow: '0 0 20px #fff'
                        }} />
                    </div>

                    <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem', letterSpacing: '-2px' }}>TrueSight</h1>
                    <p style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                        CLICK TO INITIALIZE SYSTEM
                    </p>
                </div>
            )}

            {stage === 'loading' && (
                <div style={{ width: '300px', textAlign: 'center' }}>
                    <div style={{
                        height: '2px',
                        width: '100%',
                        background: 'var(--glass-border)',
                        position: 'relative',
                        overflow: 'hidden',
                        marginBottom: '1rem'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: '100%',
                            background: 'var(--color-primary)',
                            width: '50%',
                            animation: 'loadBar 2s ease-in-out infinite'
                        }} />
                    </div>
                    <p style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-primary)',
                        fontSize: '0.8rem',
                        animation: 'blink 0.5s infinite'
                    }}>
                        ESTABLISHING SECURE CONNECTION...
                    </p>
                </div>
            )}

            <style>{`
        @keyframes loadBar {
          0% { left: -50%; width: 30%; }
          50% { left: 30%; width: 60%; }
          100% { left: 100%; width: 30%; }
        }
        @keyframes blink { 50% { opacity: 0.5; } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
        </div>
    );
}
