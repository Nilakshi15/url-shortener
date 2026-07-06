import { useState } from "react";
import ShortenForm from "../components/ShortenForm";
import ResultCard from "../components/ResultCard";
import "./Home.css";

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div className="page home">
      <section className="home__hero">
        <div className="home__eyebrow">
          <span className="badge badge--accent">
            Free · No account needed
          </span>
        </div>

        <h1 className="home__title">
          Shorten<span className="home__title-dot">.</span>{" "}
          Share<span className="home__title-dot">.</span>{" "}
          Track<span className="home__title-dot">.</span>
        </h1>

        <p className="home__subtitle">
          Paste a long URL, get a clean short link with full click analytics.
          Built with rate limiting, Redis caching, and async tracking.
        </p>
      </section>

      <section className="home__form-section">
        {!result ? (
          <ShortenForm onResult={setResult} />
        ) : (
          <ResultCard
            result={result}
            onReset={() => setResult(null)}
          />
        )}
      </section>

      {!result && (
        <section className="home__features">
          {FEATURES.map((f) => (
            <div key={f.label} className="home__feature">
              <span className="home__feature-icon">{f.icon}</span>

              <div>
                <p className="home__feature-label">{f.label}</p>
                <p className="home__feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

const FEATURES = [
  {
    icon: "⚡",
    label: "Redis-cached redirects",
    desc: "Hot URLs served in microseconds.",
  },
  {
    icon: "🛡️",
    label: "Rate limited API",
    desc: "Sliding-window protection.",
  },
  {
    icon: "📊",
    label: "Async click analytics",
    desc: "Tracking never slows redirects.",
  },
  {
    icon: "🐳",
    label: "Docker Compose",
    desc: "One command deployment.",
  },
];