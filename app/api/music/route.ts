import { NextRequest, NextResponse } from "next/server";
import { curatedMusic, pageRecords } from "@/lib/music";
import { spotifyPage } from "@/lib/spotify.server";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const limit = Number(searchParams.get("limit")) || 40;
  const cursor = searchParams.get("cursor");
  const query = searchParams.get("q") ?? "";
  const live = await spotifyPage(cursor, limit, query);
  if (live) return NextResponse.json(live, { headers: { "Cache-Control": "private, max-age=300" } });
  const normalizedQuery = query.toLowerCase();
  const items = normalizedQuery ? curatedMusic.filter((item) => `${item.title} ${item.artist} ${item.chapter}`.toLowerCase().includes(normalizedQuery)) : curatedMusic;
  return NextResponse.json(pageRecords(items, cursor, limit));
}
