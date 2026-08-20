"use client";

import { useEffect, useState } from "react";
import { integrationPreviews } from "@/lib/integrations";
import styles from "./ConnectionDesk.module.css";

type GitHubActivity = {
  source: "github" | "fallback";
  weeks: Array<{ date: string; count: number }>;
  message: string;
};

type IntegrationResponse = {
  github: GitHubActivity;
};

function contributionLevel(count: number) {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

export function ConnectionDesk() {
  const [github, setGithub] = useState<GitHubActivity | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/integrations", { signal: controller.signal })
      .then((response) => response.ok ? response.json() as Promise<IntegrationResponse> : null)
      .then((payload) => setGithub(payload?.github ?? null))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setGithub({ source: "fallback", weeks: [], message: "Contribution activity is unavailable. The verified profile still opens directly." });
      });
    return () => controller.abort();
  }, []);

  const recentDays = github?.source === "github" ? github.weeks.slice(-182) : [];

  return <section className={styles.desk} aria-labelledby="connection-heading">
    <p className="eyebrow">Supported connections</p>
    <h2 id="connection-heading" className="display">Social desk, with the labels left on.</h2>

    <div className={styles.connections}>
      {integrationPreviews.map((item) => <article key={item.kind}>
        <p className={styles.status}>{item.kind === "github" && github?.source === "github" ? "Authorized data" : "Outbound preview"}</p>
        <h3>{item.label}</h3>
        <p>{item.kind === "github" && github?.source === "github" ? "The server-side GitHub connection is active. The contribution field below uses authorized data." : item.description}</p>
        <a className="button" href={item.url} target="_blank" rel="noreferrer">Open {item.kind}</a>
      </article>)}
    </div>

    <section className={styles.github} aria-labelledby="github-activity-heading">
      <div>
        <p className="eyebrow">GitHub field</p>
        <h3 id="github-activity-heading">Contribution activity</h3>
        <p>{github?.message ?? "Checking the server-side GitHub connection."}</p>
      </div>
      {recentDays.length > 0
        ? <div className={styles.calendar} aria-label="Recent authorized GitHub contribution calendar">
            {recentDays.map((day) => <span
              key={day.date}
              className={styles.day}
              data-level={contributionLevel(day.count)}
              title={`${day.date}: ${day.count} contributions`}
              aria-label={`${day.date}: ${day.count} contributions`}
            />)}
          </div>
        : <a className="button dark" href="https://github.com/theprathambatra" target="_blank" rel="noreferrer">Open GitHub profile</a>}
    </section>
  </section>;
}
