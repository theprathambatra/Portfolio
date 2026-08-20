import "server-only";
import type { MusicPage, MusicRecord } from "./music";

type SpotifyItem = { track?: { id: string; name: string; artists: { name: string }[]; external_urls: { spotify: string } } | null };
type SpotifyResponse = { items?: SpotifyItem[]; next?: string | null };

async function accessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) return null;
  const response = await fetch("https://accounts.spotify.com/api/token", { method: "POST", headers: { Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`, "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken }), cache: "no-store" });
  if (!response.ok) return null;
  return (await response.json() as { access_token?: string }).access_token ?? null;
}

export async function spotifyPage(cursor: string | null, limit: number): Promise<MusicPage | null> {
  const token = await accessToken();
  if (!token) return null;
  const pageLimit = Math.min(50, Math.max(1, limit));
  const endpoint = cursor ? new URL(cursor) : new URL(`https://api.spotify.com/v1/me/tracks?limit=${pageLimit}`);
  if (endpoint.origin !== "https://api.spotify.com") return null;
  const response = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 300 } });
  if (!response.ok) return null;
  const data = await response.json() as SpotifyResponse;
  const items: MusicRecord[] = (data.items ?? []).flatMap(({ track }) => track ? [{ id: track.id, title: track.name, artist: track.artists.map((artist) => artist.name).join(", "), kind: "track" as const, spotifyUrl: track.external_urls.spotify, embedUrl: `https://open.spotify.com/embed/track/${track.id}`, chapter: "Saved tracks" }] : []);
  return { items, nextCursor: data.next ?? null, source: "spotify", status: "Authorized Spotify catalog" };
}
