import { useState } from 'react';
import { ChevronDown, Copy, Check, ExternalLink, MousePointerClick, Calendar } from 'lucide-react';
import { getAnalytics } from '../services/api';
import ClickChart from './ClickChart';
import { useToast } from '../hooks/useToast';
import './UrlCard.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function truncate(str, n) {
  return str.length > n ? str.slice(0, n - 1) + '…' : str;
}

export default function UrlCard({ url }) {
  const { short_code, short_url, original_url, total_clicks, created_at } = url;

  const [expanded, setExpanded]   = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading]     = useState(false);
  const [copied, setCopied]       = useState(false);
  const toast = useToast();

  async function handleExpand() {
    const next = !expanded;
    setExpanded(next);

    if (next && !analytics) {
      setLoading(true);
      try {
        const data = await getAnalytics(short_code);
        setAnalytics(data);
      } catch (err) {
        toast({ message: `Could not load analytics: ${err.message}`, type: 'error' });
        setExpanded(false);
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleCopy(e) {
    e.stopPropagation(); // don't toggle expansion
    try {
      await navigator.clipboard.writeText(short_url);
      setCopied(true);
      toast({ message: 'Copied to clipboard!', type: 'success' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ message: 'Copy failed.', type: 'error' });
    }
  }

  return (
    <div className={`url-card ${expanded ? 'url-card--open' : ''}`}>
      {/* Always-visible summary row */}
      <div className="url-card__summary" onClick={handleExpand} role="button" tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleExpand()}
        aria-expanded={expanded}
      >
        {/* Left: codes + original */}
        <div className="url-card__left">
          <span className="url-card__code mono">{short_code}</span>
          <span className="url-card__original" title={original_url}>
            <ExternalLink size={12} />
            {truncate(original_url, 55)}
          </span>
        </div>

        {/* Right: stats + controls */}
        <div className="url-card__right">
          <span className="url-card__stat" title="Total clicks">
            <MousePointerClick size={13} />
            {total_clicks ?? 0}
          </span>
          <span className="url-card__stat url-card__stat--date">
            <Calendar size={12} />
            {created_at ? formatDate(created_at) : '—'}
          </span>
          <button
            className={`url-card__copy ${copied ? 'url-card__copy--done' : ''}`}
            onClick={handleCopy}
            aria-label="Copy short URL"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
          <ChevronDown
            size={15}
            className={`url-card__chevron ${expanded ? 'url-card__chevron--up' : ''}`}
          />
        </div>
      </div>

      {/* Expandable analytics panel */}
      {expanded && (
        <div className="url-card__panel">
          {loading ? (
            <div className="url-card__loading">Loading analytics…</div>
          ) : analytics ? (
            <>
              <div className="url-card__panel-stats">
                <div className="url-card__panel-stat">
                  <span className="url-card__panel-stat-value">{analytics.total_clicks ?? 0}</span>
                  <span className="url-card__panel-stat-label">Total clicks</span>
                </div>
                <div className="url-card__panel-stat">
                  <span className="url-card__panel-stat-value mono" style={{ fontSize: '13px' }}>
                    {short_url}
                  </span>
                  <span className="url-card__panel-stat-label">Short URL</span>
                </div>
              </div>
              <ClickChart data={analytics.clicks_by_day} />
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
