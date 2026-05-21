import { useState, useRef, useEffect } from 'react';
import styles from './AIAssistant.module.css';

export function AIAssistant() {
  const [open, setOpen]       = useState(false);
  const [prompt, setPrompt]   = useState('');
  const [answer, setAnswer]   = useState('');
  const [loading, setLoading] = useState(false);
  const textareaRef           = useRef(null);

  useEffect(() => {
    if (open && textareaRef.current) textareaRef.current.focus();
  }, [open]);

  async function handleSend() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setAnswer('');
    try {
      const res  = await fetch('http://localhost:8000/api/ai/query', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ prompt: prompt.trim() }),
      });
      const data = await res.json();
      setAnswer(data.answer);
    } catch {
      setAnswer('Something went wrong. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <>
      <button className={styles.fab} onClick={() => setOpen(o => !o)} title="AI Assistant">
        🤖
      </button>

      {open && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <span className={styles.title}>AI Assistant</span>
            <button className={styles.close} onClick={() => setOpen(false)}>✕</button>
          </div>

          {answer && (
            <div className={styles.answer}>
              {loading ? <span className={styles.thinking}>Thinking…</span> : answer}
            </div>
          )}

          {!answer && loading && (
            <div className={styles.answer}>
              <span className={styles.thinking}>Thinking…</span>
            </div>
          )}

          <div className={styles.inputRow}>
            <textarea
              ref={textareaRef}
              className={styles.textarea}
              placeholder="Ask anything about your posts…"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={3}
            />
            <button
              className={styles.send}
              onClick={handleSend}
              disabled={loading || !prompt.trim()}
            >
              {loading ? '…' : '↑'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
