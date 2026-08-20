"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MusicPage } from "@/lib/music";
import styles from "./MusicCatalog.module.css";

const emptyPage: MusicPage = {
  items: [],
  nextCursor: null,
  source: "curated",
  status: "Checking integration status",
};

export function MusicCatalog() {
  const [page, setPage] = useState<MusicPage>(emptyPage);
  const [query, setQuery] = useState("");
  const [cursorHistory, setCursorHistory] = useState<Array<string | null>>([null]);
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const requestRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const loadPage = useCallback(async (cursor: string | null) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const request = ++requestRef.current;
    setLoading(true);
    setError(null);
    const params = new URLSearchParams({ limit: "40" });
    if (cursor) params.set("cursor", cursor);
    if (query.trim()) params.set("q", query.trim());
    try {
      const response = await fetch(`/api/music?${params}`, { signal: controller.signal });
      if (!response.ok) throw new Error("The music catalog could not be loaded.");
      const next = await response.json() as MusicPage;
      if (request === requestRef.current) setPage(next);
    } catch (caught: unknown) {
      if (caught instanceof DOMException && caught.name === "AbortError") return;
      if (request === requestRef.current) setError("The music catalog is temporarily unavailable. Spotify still opens directly.");
    } finally {
      if (request === requestRef.current) setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCursorHistory([null]);
      setPageIndex(0);
      void loadPage(null);
    }, 180);
    return () => {
      window.clearTimeout(timer);
      abortRef.current?.abort();
    };
  }, [loadPage]);

  const nextPage = () => {
    if (!page.nextCursor || loading) return;
    const nextHistory = [...cursorHistory.slice(0, pageIndex + 1), page.nextCursor];
    const nextIndex = pageIndex + 1;
    setCursorHistory(nextHistory);
    setPageIndex(nextIndex);
    void loadPage(page.nextCursor);
  };

  const previousPage = () => {
    if (pageIndex === 0 || loading) return;
    const previousIndex = pageIndex - 1;
    setPageIndex(previousIndex);
    void loadPage(cursorHistory[previousIndex] ?? null);
  };

  const hasPrevious = pageIndex > 0;
  const hasNext = Boolean(page.nextCursor);

  return <div>
    <label className={styles.search}>
      Search the current vault page
      <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Track, artist or chapter" />
    </label>
    <div className={styles.catalogStatus} aria-live="polite">
      <p><strong>Integration status:</strong> {error ?? page.status}</p>
      <p>Page {pageIndex + 1} / at most 40 records mounted</p>
    </div>

    {page.items.length > 0
      ? <ul className={styles.list}>
          {page.items.map((record, index) => <li key={record.id}>
            <div><small>{record.chapter}</small><h2>{record.title}</h2><p>{record.artist}</p></div>
            {record.embedUrl && index < 3
              ? <iframe title={`Spotify player for ${record.title}`} src={record.embedUrl} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
              : null}
            <a className="button" href={record.spotifyUrl} target="_blank" rel="noreferrer">Open in Spotify</a>
          </li>)}
        </ul>
      : <div className={styles.empty}>
          <p className="eyebrow">{page.source === "spotify" ? "Authorized catalog / empty page" : "Curated fallback / outbound connection"}</p>
          <h2 className="display">{page.source === "spotify" ? "No matches on this page." : "The shelves are ready. The records are not fabricated."}</h2>
          <p>{page.source === "spotify"
            ? "Clear the search or continue to another page of the authorized library."
            : "No approved track or playlist records are present in the source material. Authorized Spotify credentials can populate this paginated catalog."}</p>
          <a className="button dark" href="https://open.spotify.com/user/31hfojbpw2eu4xhwikesijhylapm" target="_blank" rel="noreferrer">Open in Spotify</a>
        </div>}

    {hasPrevious || hasNext
      ? <nav className={styles.pagination} aria-label="Music catalog pages">
          <button className="button" type="button" disabled={!hasPrevious || loading} onClick={previousPage}>Previous 40</button>
          <span>Page {pageIndex + 1}</span>
          <button className="button dark" type="button" disabled={!hasNext || loading} onClick={nextPage}>{loading ? "Loading records" : "Next 40"}</button>
        </nav>
      : null}
  </div>;
}
