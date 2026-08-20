"use client";

import { useCallback, useEffect, useState } from "react";
import type { MusicPage, MusicRecord } from "@/lib/music";
import styles from "./MusicCatalog.module.css";

const emptyPage: MusicPage = { items: [], nextCursor: null, source: "curated", status: "Checking integration status" };
export function MusicCatalog() {
  const [page, setPage] = useState<MusicPage>(emptyPage);
  const [records, setRecords] = useState<MusicRecord[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const load = useCallback(async (cursor?: string | null, replace = false) => {
    setLoading(true);
    const params = new URLSearchParams({ limit: "40" });
    if (cursor) params.set("cursor", cursor);
    if (query) params.set("q", query);
    const response = await fetch(`/api/music?${params}`);
    const next = await response.json() as MusicPage;
    setPage(next); setRecords((current) => replace ? next.items : [...current, ...next.items]); setLoading(false);
  }, [query]);
  useEffect(() => { const timer = window.setTimeout(() => void load(null, true), 180); return () => window.clearTimeout(timer); }, [load]);
  return <div><label className={styles.search}>Search the vault<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Track, artist or chapter" /></label><p className={styles.status}><strong>Integration status:</strong> {page.status}</p>{records.length ? <><ul className={styles.list}>{records.map((record, index) => <li key={`${record.id}-${index}`}><div><small>{record.chapter}</small><h2>{record.title}</h2><p>{record.artist}</p></div>{record.embedUrl && index < 3 && <iframe title={`Spotify player for ${record.title}`} src={record.embedUrl} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"/>}<a className="button" href={record.spotifyUrl} target="_blank" rel="noreferrer">Open in Spotify</a></li>)}</ul>{page.nextCursor && <button className="button dark" disabled={loading} onClick={() => void load(page.nextCursor)}>{loading ? "Loading records" : "Load the next 40"}</button>}</> : <div className={styles.empty}><p className="eyebrow">Curated fallback / outbound connection</p><h2 className="display">The shelves are ready. The records are not fabricated.</h2><p>No approved track or playlist records are present in the source material. Authorized Spotify credentials can populate this paginated catalog.</p><a className="button dark" href="https://open.spotify.com/user/31hfojbpw2eu4xhwikesijhylapm" target="_blank" rel="noreferrer">Open in Spotify</a></div>}</div>;
}
