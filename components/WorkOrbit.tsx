"use client";
import { useState } from "react";
import sitesData from "@/content/websites.json";
import styles from "./WorkOrbit.module.css";
export default function WorkOrbit(){const [active,setActive]=useState(0);const sites=sitesData.sites;return <div className={styles.wrap}><div className={styles.orbit} aria-hidden="true">{sites.slice(0,12).map((site,i)=><button key={site.id} tabIndex={-1} style={{"--i":i} as React.CSSProperties} onClick={()=>setActive(i)}>{site.name}</button>)}</div><aside className={styles.detail}><p className="eyebrow">Selected coordinate {String(active+1).padStart(2,"0")}</p><h2 className="display">{sites[active].name}</h2><p>{sites[active].category}</p><a className="button dark" href={sites[active].url} target="_blank" rel="noreferrer">Visit site</a></aside></div>}
