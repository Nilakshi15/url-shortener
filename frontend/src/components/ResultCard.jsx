import { useState, useEffect } from 'react';
import { Copy, Check, ExternalLink, BarChart2, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import './ResultCard.css';

/**
 * Signature element: the short URL reveals character-by-character
 * (typewriter effect) to feel like it's being "generated".
 * Copy button transitions indigo → green with a smooth swap.
 */
export default function ResultCard({ result, onReset }) {
  const { short_url, short_code, original_url } = result;
  const [displayed, setDisplayed] = useState('');
  const [copied, setCopied]       = useState(false);
  const toast = useToast();

  // Typewriter reveal
  useEffect(() => {
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(short_url.slice(0, i));
      if (i >= short_url.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [short_url]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(short_url);
      setCopied(true);
      toast({ message: 'Copied to clipboard!', type: 'success' });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast({ message: 'Copy failed — select and copy manually.', type: 'error' });
    }
  }

  const truncated = original_url.length > 60
    ? original_url.slice(0, 57) + '…'
    : original_url;

  return (
    <div className="result-card">
      {/* Header */}
      <div className="result-card__header">
        <span className="badge badge--success">✓ Ready to share</span>
        <button className="result-card__reset" onClick={onReset} title="Shorten another URL">
          <RotateCcw size={14} />
          Shorten another
        </button>
      </div>

      {/* Short URL display — the signature element */}
      <div className="result-card__url-box">
        <span className="result-card__short-url mono">
          {displayed}
          {displayed.length < short_url.length && (
            <span className="result-card__cursor" aria-hidden="true">|</span>
          )}
        </span>
        <button
          className={`result-card__copy-btn ${copied ? 'result-card__copy-btn--copied' : ''}`}
          onClick={handleCopy}
          aria-label={copied ? 'Copied!' : 'Copy short URL'}
        >
          {copied ? <Check size={16} strokeWidth={2.5} /> : <Copy size={16} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Original URL */}
      <div className="result-card__original">
        <span className="result-card__original-label">Original</span>
        <a
          href={original_url}
          target="_blank"
          rel="noopener noreferrer"
          className="result-card__original-link"
          title={original_url}
        >
          <ExternalLink size={12} />
          {truncated}
        </a>
      </div>

      {/* Analytics CTA */}
      <div className="result-card__footer">
        <Link to="/dashboard" className="result-card__analytics-link">
          <BarChart2 size={14} />
          View analytics in Dashboard
        </Link>
      </div>
    </div>
  );
}
