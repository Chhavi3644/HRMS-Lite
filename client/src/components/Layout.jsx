import React from 'react';
import '../styles/main.css';

const Layout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <nav style={{
                backgroundColor: 'var(--card-bg)',
                borderBottom: '1px solid var(--border-color)',
                padding: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        background: 'var(--primary-color)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold'
                    }}>HR</div>
                    <h1 style={{ fontSize: '1.25rem', margin: 0 }}>HRMS Lite</h1>
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    Admin Portal
                </div>
            </nav>

            <main className="container" style={{ flex: 1, padding: '2rem 1rem' }}>
                {children}
            </main>

            <footer style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem'
            }}>
                HRMS Lite © {new Date().getFullYear()}
            </footer>
        </div>
    );
};

export default Layout;
