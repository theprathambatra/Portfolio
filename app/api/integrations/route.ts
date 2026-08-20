import { NextResponse } from "next/server";
import { githubActivity } from "@/lib/github.server";
import { integrationPreviews } from "@/lib/integrations";
export async function GET(){return NextResponse.json({connections:integrationPreviews,github:await githubActivity()},{headers:{"Cache-Control":"public, s-maxage=3600"}})}
