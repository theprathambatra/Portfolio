import { chromium } from "@playwright/test";
import { mkdir,writeFile } from "node:fs/promises";
import data from "../content/websites.json";
const output="public/previews";
await mkdir(output,{recursive:true});
const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});
const status:Record<string,string>={};
for(const site of data.sites){try{await page.goto(site.url,{waitUntil:"domcontentloaded",timeout:20000});await page.screenshot({path:`${output}/${site.id}.webp`,type:"webp",quality:72});status[site.id]="captured"}catch(error){status[site.id]=error instanceof Error?error.message:"Capture failed"}}
await browser.close();
await writeFile(`${output}/capture-status.json`,JSON.stringify(status,null,2)+"\n");
