import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Link2,
  MousePointerClick,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

import { getAllUrls } from "../services/api";
import UrlCard from "../components/UrlCard";
import { useToast } from "../hooks/useToast";

import "./DashboardPage.css";

export default function DashboardPage() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const toast = useToast();

  async function load() {
    setLoading(true);
    setError("");

    try {
      const data = await getAllUrls();
      setUrls(data);
    } catch (err) {
      setError(err.message);

      toast({
        message: err.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const totalClicks = urls.reduce(
    (sum, url) => sum + (url.total_clicks ?? 0),
    0
  );

  const topUrl =
    urls.length > 0
      ? urls.reduce((best, url) =>
          url.total_clicks > best.total_clicks
            ? url
            : best
        )
      : null;

  return (
    <div className="page dashboard">
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">
            Dashboard
          </h1>

          <p className="dashboard__subtitle">
            All your shortened URLs.
          </p>
        </div>

        <button
          className="dashboard__refresh"
          onClick={load}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {!loading &&
        !error &&
        urls.length > 0 && (
          <div className="dashboard__stats">
            <div className="dashboard__stat-card">
              <Link2 size={18} />
              <p>{urls.length} URLs</p>
            </div>

            <div className="dashboard__stat-card">
              <MousePointerClick size={18} />
              <p>{totalClicks} Clicks</p>
            </div>

            {topUrl && (
              <div className="dashboard__stat-card">
                <TrendingUp size={18} />
                <p>{topUrl.short_code}</p>
              </div>
            )}
          </div>
        )}

      {loading && <p>Loading...</p>}

      {!loading &&
        error && (
          <>
            <p>{error}</p>

            <button onClick={load}>
              Retry
            </button>
          </>
        )}

      {!loading &&
        !error &&
        urls.length === 0 && (
          <>
            <p>No URLs yet.</p>

            <Link to="/">
              Create one →
            </Link>
          </>
        )}

      {!loading &&
        !error &&
        urls.map((url) => (
          <UrlCard
            key={url.short_code}
            url={url}
          />
        ))}
    </div>
  );
}