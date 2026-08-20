import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import sitesData from "@/content/websites.json";
import profile from "@/content/profile.json";
import styles from "./work.module.css";

const Orbit = dynamic(() => import("@/components/WorkOrbit"), { loading: () => <p>Preparing the orbit...</p> });

const servicePostcards = [
  {
    code: "SOL",
    title: "Solar",
    detail: "Residential, commercial and industrial solar energy systems, from site study and design through installation support.",
  },
  {
    code: "AIR",
    title: "HVAC",
    detail: "VRV, VRF, ductable and split-air-conditioning solutions supported by an in-house HVAC practice.",
  },
  {
    code: "PWR",
    title: "Power",
    detail: "UPS, inverter, battery, stabilizer and electrical-panel solutions for continuity and power quality.",
  },
  {
    code: "SAFE",
    title: "Safety Audits",
    detail: "Energy, electrical and fire-safety audits focused on practical risk identification and corrective planning.",
  },
] as const;

export const metadata: Metadata = {
  title: "Work Orbit",
  description: "Eighteen approved websites and a focused Swawlambi operations case file.",
};

export default function Work() {
  return <>
    <main id="main">
      <section className={styles.hero}>
        <div className="shell">
          <p className="eyebrow">18 sites / one working practice</p>
          <h1 className="display">Work Orbit</h1>
          <p>A navigable record of websites created or contributed to. No unverified performance results are attached.</p>
          <Orbit />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <p className="eyebrow">Accessible flight manifest</p>
          <h2 className="display">Every site, within reach.</h2>
          <ol className={styles.manifest}>
            {sitesData.sites.map((site, index) => <li key={site.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{site.name}</h3><p>{site.category}</p></div>
              <a className="button" href={site.url} target="_blank" rel="noreferrer">Visit site<span className="srOnly">: {site.name}</span></a>
            </li>)}
          </ol>
        </div>
      </section>

      <section className={`${styles.swawlambi} section`}>
        <div className="shell">
          <div className={styles.caseHead}>
            <Image src="/assets/swawlambi-logo.jpg" alt="Swawlambi Inc. logo" width={260} height={260} />
            <div>
              <p className="eyebrow">Operational case file</p>
              <h2 className="display">Where power meets purpose.</h2>
              <p>{profile.work[0].summary}</p>
            </div>
          </div>

          <div className={styles.services} aria-label="Swawlambi service postcards">
            {servicePostcards.map((postcard, index) => <article key={postcard.code}>
              <span>{postcard.code} / {String(index + 1).padStart(2, "0")}</span>
              <h3>{postcard.title}</h3>
              <p>{postcard.detail}</p>
            </article>)}
          </div>

          <div className={styles.claims}>
            {profile.swawlambi.companyReportedClaims.map((claim) => <div key={claim.label}>
              <strong>{claim.value}</strong>
              <p>{claim.label}</p>
              <small>{claim.requiredDisclosure}</small>
            </div>)}
          </div>

          <div className={styles.map}>
            <div>
              <h3>Office coordinates</h3>
              <address>{profile.swawlambi.address}</address>
              <a className="button" href={profile.swawlambi.map.shortUrl} target="_blank" rel="noreferrer">Get directions</a>
            </div>
            <iframe title="Map showing the Swawlambi office in Inderlok, Delhi" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=28.6690016,77.1686023&z=17&output=embed" />
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </>;
}
