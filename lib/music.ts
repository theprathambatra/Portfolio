export type MusicKind = "track" | "playlist";
export type MusicRecord = { id: string; title: string; artist: string; kind: MusicKind; spotifyUrl: string; embedUrl?: string; chapter: string };
export type MusicPage = { items: MusicRecord[]; nextCursor: string | null; source: "spotify" | "curated"; status: string };
export const curatedMusic: MusicRecord[] = [];
export function pageRecords(records: MusicRecord[], cursor: string | null, limit = 40): MusicPage {
  const start = Math.max(0, Number(cursor) || 0);
  const safe = Math.min(60, Math.max(1, limit));
  return { items: records.slice(start, start + safe), nextCursor: start + safe < records.length ? String(start + safe) : null, source: "curated", status: "Curated fallback. Spotify API credentials are not configured." };
}
