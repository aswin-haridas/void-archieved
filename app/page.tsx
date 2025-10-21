"use client";

import { useEffect, useRef, useState } from "react";
import "../hooks/styles/AutocompleteStyles.css";
import "../hooks/styles/InputStyles.css";
import Background from "./Background";

const processQuery = (q: string, urls: Record<string, string>) => {
  if (q.startsWith("https://") || q.startsWith("http://")) return q;
  if (q.startsWith("!")) return `https://${q.slice(1)}`;
  if (q.toLowerCase().includes("@images"))
    return `https://www.google.com/search?hl=en&tbm=isch&q=${encodeURIComponent(
      q.replace(/@images/i, "").trim()
    )}`;
  if (/@youtube|@yt/i.test(q))
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(
      q.replace(/@youtube|@yt/i, "").trim()
    )}`;
  return urls[q] || `https://www.google.com/search?q=${encodeURIComponent(q)}`;
};

export default function Home() {
  const [q, setQ] = useState("");
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [suggestions] = useState<{ text: string }[]>([]);
  const [idx, setIdx] = useState(0);
  const [cursor, setCursor] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    ref.current?.focus();
    fetch(
      "https://raw.githubusercontent.com/aswin-haridas/Database/refs/heads/main/links.json"
    )
      .then((r) => r.json())
      .then(setUrls)
      .catch(console.error);
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIdx((p) => (p + 1) % suggestions.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIdx((p) => (p - 1 + suggestions.length) % suggestions.length);
      } else if (e.keyCode === 9) {
        e.preventDefault();
        if (suggestions[idx]) setQ(suggestions[idx].text);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (idx > 0 && suggestions[idx - 1]) {
          window.open(
            urls[suggestions[idx - 1].text] ||
              `https://www.google.com/search?q=${encodeURIComponent(
                suggestions[idx - 1].text
              )}`,
            "_self"
          );
          setIdx(0);
        } else if (q.trim()) {
          const t = q.trim();
          window.open(
            processQuery(t.startsWith("http") ? t : t.toLowerCase(), urls),
            "_self"
          );
          setQ("");
        }
      }
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [idx, suggestions, q, urls]);

  useEffect(() => {
    const t = setTimeout(
      () => ref.current && setCursor(ref.current.selectionStart || q.length),
      0
    );
    return () => clearTimeout(t);
  }, [q]);

  const prefix = q || "";
  const suffix = suggestions[idx]
    ? suggestions[idx].text.slice(prefix.length)
    : "";

  return (
    <>
      <Background />
      <form onSubmit={(e) => e.preventDefault()} className="container">
        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              ref={ref}
              className="raleway search alive"
              value={q}
              onInput={(e) => {
                setCursor(e.currentTarget.selectionStart || 0);
                setQ(e.currentTarget.value);
              }}
              onKeyUp={(e) => setCursor(e.currentTarget.selectionStart || 0)}
              onMouseUp={(e) => setCursor(e.currentTarget.selectionStart || 0)}
              aria-autocomplete="list"
              autoComplete="off"
            />
            {suffix && (
              <div className="search-suggestion raleway" aria-hidden="true">
                <span className="search-prefix">{prefix}</span>
                <span className="search-suffix">{suffix}</span>
              </div>
            )}
          </div>
        </div>
        {suggestions.length > 0 && (
          <div className="autocomplete-list raleway-light">
            {suggestions.map((s, i) => (
              <button
                key={`${s.text}-${i}`}
                type="button"
                className={`autocomplete-item ${idx === i ? "glow" : ""}`}
                onClick={() => {
                  window.open(
                    urls[s.text] ||
                      `https://www.google.com/search?q=${encodeURIComponent(
                        s.text
                      )}`,
                    "_self"
                  );
                  setIdx(0);
                }}
              >
                <span className="suggestion-text">{s.text}</span>
              </button>
            ))}
          </div>
        )}
      </form>
    </>
  );
}
