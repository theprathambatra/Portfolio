import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { MusicCatalog } from "@/components/MusicCatalog";
import { curatedMusic } from "@/lib/music";
import styles from "./music.module.css";
export const metadata:Metadata={title:"Music Vault",description:"A scalable, searchable Spotify catalog with an honest credential-free fallback."};
export default function Music(){return <><main id="main"><section className={styles.hero}><div className="shell"><p className="eyebrow">A listening index built for 5,000+ records</p><h1 className="display">Music Vault</h1><p>The interface paginates in batches of 40 and mounts no more than the visible catalog. Spotify controls playback availability and account requirements.</p></div></section><section className="section"><div className="shell"><MusicCatalog records={curatedMusic}/></div></section></main><Footer/></>}
