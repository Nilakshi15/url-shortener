import { useState } from "react";
import { Link2, ChevronDown, Loader2, Sparkles } from "lucide-react";
import { shortenUrl } from "../services/api";
import { useToast } from "../hooks/useToast";
import "./ShortenForm.css";

export default function ShortenForm({ onResult }) {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [showAlias, setShowAlias] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toast = useToast();

  function isValidUrl(str) {
    try {
      new URL(str);
      return true;
    } catch {
      return false;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const trimmedUrl = url.trim();
    const trimmedAlias = alias.trim();

    console.log("URL state:", trimmedUrl);
    console.log("Alias state:", trimmedAlias);

    if (!trimmedUrl) {
      setError("Please enter a URL.");
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setError("That doesn't look like a valid URL. Include https://");
      return;
    }

    if (trimmedAlias && !/^[a-zA-Z0-9_-]{3,30}$/.test(trimmedAlias)) {
      setError("Alias must be 3–30 characters: letters, numbers, - or _");
      return;
    }

    const payload = {
      originalUrl: trimmedUrl,
      customAlias: trimmedAlias,
    };

    console.log("Sending payload:", payload);

    setLoading(true);

    try {
      const result = await shortenUrl(payload);

      console.log("Backend Response:", result);

      onResult(result);

      setUrl("");
      setAlias("");
      setShowAlias(false);
    } catch (err) {
      console.error(err);

      setError(err.message);

      toast({
        message: err.message,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="shorten-form" onSubmit={handleSubmit} noValidate>
      <div
        className={`shorten-form__input-row ${
          error ? "shorten-form__input-row--error" : ""
        }`}
      >
        <Link2 size={18} className="shorten-form__icon" />

        <input
          type="url"
          className="shorten-form__input"
          placeholder="Paste a long URL here..."
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError("");
          }}
          autoFocus
        />

        <button
          type="submit"
          className="shorten-form__btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="shorten-form__spinner" />
              Shortening...
            </>
          ) : (
            <>
              <Sparkles size={15} />
              Shorten
            </>
          )}
        </button>
      </div>

      {error && <p className="shorten-form__error">{error}</p>}

      <div className="shorten-form__alias-section">
        <button
          type="button"
          className="shorten-form__alias-toggle"
          onClick={() => setShowAlias(!showAlias)}
        >
          <ChevronDown
            size={14}
            style={{
              transform: showAlias ? "rotate(180deg)" : "rotate(0deg)",
              transition: "0.2s",
            }}
          />
          {showAlias ? "Hide custom alias" : "Use a custom alias"}
        </button>

        {showAlias && (
          <div className="shorten-form__alias-input-wrap">
            <span className="shorten-form__alias-prefix">snip.ly/</span>

            <input
              type="text"
              className="shorten-form__alias-input"
              placeholder="my-link"
              value={alias}
              onChange={(e) => {
                setAlias(e.target.value);
                setError("");
              }}
            />
          </div>
        )}
      </div>
    </form>
  );
}