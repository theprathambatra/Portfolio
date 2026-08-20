import { describe,expect,it } from "vitest";
import { pageRecords,type MusicRecord } from "./music";
const records:MusicRecord[]=Array.from({length:5000},(_,i)=>({id:String(i),title:`Track ${i}`,artist:"Artist",kind:"track",spotifyUrl:"https://open.spotify.com/",chapter:"Index"}));
describe("music pagination",()=>{it("bounds the DOM-sized page and advances a cursor across a 5,000 record catalog",()=>{const first=pageRecords(records,null,40);expect(first.items).toHaveLength(40);expect(first.nextCursor).toBe("40");expect(pageRecords(records,"40",40).items[0].id).toBe("40")});it("caps hostile page sizes",()=>expect(pageRecords(records,null,5000).items).toHaveLength(60))});
