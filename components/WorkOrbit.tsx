"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import sitesData from "@/content/websites.json";
import styles from "./WorkOrbit.module.css";

const suppliedPreview: Record<string, string> = {
  swawlambi: "/reference/byob/page-4.webp",
  dalcia: "/reference/byob/page-5.webp",
  vedaprint: "/reference/byob/page-5.webp",
  hashtagg: "/reference/byob/page-6.webp",
  whattacart: "/reference/byob/page-6.webp",
};

export default function WorkOrbit() {
  const [active, setActive] = useState(0);
  const [captured, setCaptured] = useState<Record<string, string>>({});
  const [previewFailed, setPreviewFailed] = useState(false);
  useEffect(() => { fetch("/previews/manifest.json").then((response) => response.ok ? response.json() as Promise<Record<string, string>> : {}).then(setCaptured).catch(() => setCaptured({})); }, []);
  const sites = sitesData.sites;
  const selected = sites[active];
  const preview = captured[selected.id] ?? suppliedPreview[selected.id];
  useEffect(() => setPreviewFailed(false), [active, preview]);
  return <div className={styles.wrap}>
    <div className={styles.orbit} aria-label="Interactive website orbit">
      {sites.map((site, index) => <button key={site.id} style={{ "--i": index } as React.CSSProperties} aria-pressed={active === index} onClick={() => setActive(index)}>{site.name}</button>)}
    </div>
    <div className={styles.mobileRail} aria-label="Swipe through website projects">{sites.map((site, index) => <button key={site.id} aria-pressed={active === index} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{site.name}</button>)}</div>
    <aside className={styles.detail} aria-live="polite">
      <div className={styles.preview}>{preview && !previewFailed ? <Image key={preview} src={preview} alt={`Preview associated with ${selected.name}`} fill sizes="(max-width: 850px) 90vw, 32vw" onError={() => setPreviewFailed(true)}/> : <div className={styles.fallback}><span>{selected.name.slice(0, 2).toUpperCase()}</span><p>Preview not supplied</p></div>}</div>
      <p className="eyebrow">Selected coordinate {String(active + 1).padStart(2, "0")}</p>
      <h2 className="display">{selected.name}</h2><p>{selected.category}</p>
      <a className="button dark" href={selected.url} target="_blank" rel="noreferrer">Visit site</a>
    </aside>
  </div>;
}
