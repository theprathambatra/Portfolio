import { NextRequest,NextResponse } from "next/server";
import { curatedMusic,pageRecords } from "@/lib/music";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest){const {searchParams}=request.nextUrl;const q=(searchParams.get("q")||"").toLowerCase();const items=q?curatedMusic.filter(x=>`${x.title} ${x.artist} ${x.chapter}`.toLowerCase().includes(q)):curatedMusic;return NextResponse.json(pageRecords(items,searchParams.get("cursor"),Number(searchParams.get("limit"))||40),{headers:{"Cache-Control":"public, s-maxage=300, stale-while-revalidate=600"}})}
