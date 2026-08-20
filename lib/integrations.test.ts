import { describe, expect, it } from "vitest";
import websites from "@/content/websites.json";
import { integrationPreviews } from "./integrations";
describe("content manifests",()=>{it("contains all 18 uniquely identified approved sites",()=>{expect(websites.sites).toHaveLength(18);expect(new Set(websites.sites.map((site)=>site.id)).size).toBe(18)});it("labels every protected social integration as outbound until authorized",()=>{expect(integrationPreviews).toHaveLength(3);expect(integrationPreviews.every((item)=>item.status==="outbound")).toBe(true)})});
