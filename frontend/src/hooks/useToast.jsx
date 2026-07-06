import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    clearTimeout(timers.current[id]);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ message, type = 'success', duration = 3500 }) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be inside ToastProvider');
  return ctx;
}

/* ─── Toast UI ────────────────────────────────────────────────── */
function ToastContainer({ toasts, dismiss }) {
  if (!toasts.length) return null;

  return (
    <div style={styles.container}>
      {toasts.map((t) => (
        <div key={t.id} style={{ ...styles.toast, ...styles[t.type] }}>
          <span>{t.message}</span>
          <button onClick={() => dismiss(t.id)} style={styles.close} aria-label="Dismiss">
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    zIndex: 9999,
  },
  toast: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: 500,
    fontFamily: "'Inter', sans-serif",
    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    animation: 'fadeUp 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    minWidth: '260px',
    maxWidth: '380px',
  },
  success: {
    background: '#0D2118',
    border: '1px solid rgba(16,185,129,0.3)',
    color: '#6EE7B7',
  },
  error: {
    background: '#1F0D0D',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#FCA5A5',
  },
  info: {
    background: '#0D1320',
    border: '1px solid rgba(99,102,241,0.3)',
    color: '#A5B4FC',
  },
  close: {
    marginLeft: 'auto',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    color: 'inherit',
    opacity: 0.6,
    fontSize: '12px',
    padding: '0 2px',
    lineHeight: 1,
  },
};
