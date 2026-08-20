"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profile from "@/content/profile.json";
import styles from "./HomeStory.module.css";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function educationPeriod(start: string, end: string) {
  if (/^\d{4}$/.test(start) && /^\d{4}$/.test(end)) return `${start} to ${end}`;
  const label = (value: string) => {
    const [year, month] = value.split("-");
    const monthIndex = Number(month) - 1;
    return monthNames[monthIndex] ? `${monthNames[monthIndex]} ${year}` : year;
  };
  return `${label(start)} to ${label(end)}`;
}

function Footballer() {
  return <svg className={styles.playerSvg} viewBox="0 0 420 430" role="img" aria-label="A young left winger juggling a football while checking his phone">
    <defs>
      <linearGradient id="jersey" x1="0" x2="1"><stop stopColor="#f8f1e5"/><stop offset="1" stopColor="#d8ccb8"/></linearGradient>
      <clipPath id="head"><ellipse cx="215" cy="91" rx="48" ry="55"/></clipPath>
    </defs>
    <g data-character className={styles.characterBody}>
      <path d="M177 85c0-46 72-66 91-17 12 31-6 78-47 80-33 1-48-31-44-63Z" fill="#b96f49" stroke="#171713" strokeWidth="6"/>
      <path d="M169 82c2-55 77-74 101-20-17-14-36-17-55-10-10 4-16 17-28 16l-4 28Z" fill="#171713"/>
      <path d="M181 92c8-8 14-7 22-2m30-2c8-5 16-3 22 3" fill="none" stroke="#171713" strokeWidth="5" strokeLinecap="round"/>
      <path d="M207 119c11 7 22 7 31-1" fill="none" stroke="#642f27" strokeWidth="4" strokeLinecap="round"/>
      <path d="M170 149c31-18 72-18 104 0l31 120-80 31-86-32Z" fill="url(#jersey)" stroke="#171713" strokeWidth="7"/>
      <path d="m174 157 49 42 48-43M223 198v91" fill="none" stroke="#cc861b" strokeWidth="8"/>
      <path d="M207 211h32v40h-32z" fill="#2455b5"/><text x="223" y="238" textAnchor="middle" fill="#f1e9da" fontSize="24" fontWeight="700">7</text>
      <path data-arm-phone d="M276 163c35 16 49 56 57 93" fill="none" stroke="#171713" strokeWidth="25" strokeLinecap="round"/>
      <path d="M334 254c5 3 9 10 7 17" fill="none" stroke="#b96f49" strokeWidth="22" strokeLinecap="round"/>
      <g className={styles.phone}><rect x="323" y="219" width="34" height="55" fill="#171713" stroke="#f1e9da" strokeWidth="4"/><circle cx="340" cy="263" r="2" fill="#f1e9da"/></g>
      <path d="M149 165c-37 28-42 77-31 111" fill="none" stroke="#171713" strokeWidth="25" strokeLinecap="round"/>
      <path d="M151 276 129 366M270 276l44 88" fill="none" stroke="#171713" strokeWidth="29" strokeLinecap="round"/>
      <path d="m103 377 44-7m151 6 49-3" stroke="#982e29" strokeWidth="19" strokeLinecap="square"/>
    </g>
    <g data-hero-ball className={styles.heroBall}>
      <circle cx="84" cy="308" r="37" fill="#f1e9da" stroke="#171713" strokeWidth="6"/>
      <path d="m84 286 17 12-6 20H73l-7-20Zm-17 12-18-5m52 5 18-5m-24 25 9 18m-31-18-10 18" fill="#171713" stroke="#171713" strokeWidth="5"/>
    </g>
  </svg>;
}

export function HomeStory() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const host = root.current;
    if (!host) return;
    const select = gsap.utils.selector(host);
    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const context = gsap.context(() => {
      const player = select("[data-player]")[0] as HTMLElement;
      const playerVisual = select("[data-player-visual]")[0] as HTMLElement;
      const ball = select("[data-hero-ball]")[0];
      const handle = select("[data-handle]")[0];
      const hero = select("[data-hero]")[0] as HTMLElement;
      const briefcase = select("[data-briefcase]")[0] as HTMLElement;
      const packCards = select("[data-pack-card]") as HTMLElement[];
      let heroInView = hero.getBoundingClientRect().bottom > 0;
      let kickActive = false;
      const travelDistance = () => Math.max(0, host.clientWidth - Math.min(420, host.clientWidth * 0.82) - 40);
      const travel = gsap.timeline({ repeat: -1, paused: true })
        .set(playerVisual, { scaleX: 1 })
        .to(player, { x: travelDistance, duration: 6.5, ease: "sine.inOut" })
        .set(playerVisual, { scaleX: -1 })
        .to(player, { x: 0, duration: 6.5, ease: "sine.inOut" })
        .set(playerVisual, { scaleX: 1 });
      const juggle = gsap.timeline({ repeat: -1, yoyo: true, paused: true }).to(ball, { y: -62, rotate: 28, duration: .56, ease: "power2.out" });
      const bounce = gsap.to(handle, { y: -8, duration: .5, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true });

      const syncContinuous = () => {
        const shouldPlay = !document.hidden && heroInView && !kickActive;
        if (shouldPlay) {
          travel.play();
          juggle.play();
          bounce.play();
        } else {
          travel.pause();
          juggle.pause();
          bounce.pause();
        }
      };
      document.addEventListener("visibilitychange", syncContinuous);
      const resizeObserver = new ResizeObserver(() => travel.invalidate());
      resizeObserver.observe(host);
      ScrollTrigger.create({
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => { heroInView = true; syncContinuous(); },
        onLeave: () => { heroInView = false; syncContinuous(); },
        onEnterBack: () => { heroInView = true; syncContinuous(); },
        onLeaveBack: () => { heroInView = false; syncContinuous(); },
      });
      syncContinuous();

      gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "45% top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onEnter: () => { kickActive = true; gsap.set(playerVisual, { scaleX: 1 }); syncContinuous(); },
          onLeave: () => { kickActive = false; syncContinuous(); },
          onEnterBack: () => { kickActive = true; gsap.set(playerVisual, { scaleX: 1 }); syncContinuous(); },
          onLeaveBack: () => { kickActive = false; syncContinuous(); },
        },
      })
        .to(player, { x: () => travelDistance() * .52, duration: .12, ease: "power1.out" }, 0)
        .to(ball, { y: 8, x: 105, rotate: 80, duration: .25, ease: "power1.in" }, 0)
        .to(select("[data-character]")[0], { rotate: -7, x: -12, transformOrigin: "50% 85%", duration: .18 }, .08)
        .to(select("[data-character]")[0], { rotate: 10, x: 18, duration: .18 }, .26)
        .to(ball, { x: 150, y: -80, duration: .2, ease: "power2.out" }, .3)
        .to(ball, { x: 210, y: -30, scale: 38, duration: .7, ease: "power3.in", transformOrigin: "center" }, .48)
        .to(select("[data-wipe-label]")[0], { opacity: 1, duration: .15 }, .87);

      gsap.timeline({ scrollTrigger: { trigger: select("[data-pack]")[0], start: "top 70%", end: "bottom 42%", scrub: true, invalidateOnRefresh: true } })
        .to(packCards, {
          x: (_index: number, target: HTMLElement) => {
            const card = target.getBoundingClientRect();
            const destination = briefcase.getBoundingClientRect();
            return destination.left + destination.width / 2 - (card.left + card.width / 2);
          },
          y: (_index: number, target: HTMLElement) => {
            const card = target.getBoundingClientRect();
            const destination = briefcase.getBoundingClientRect();
            return destination.top + destination.height * .64 - (card.top + card.height / 2);
          },
          rotate: (index: number) => index % 2 ? 14 : -12,
          scale: .16,
          opacity: 0,
          stagger: .06,
        })
        .to(select("[data-case-lid]")[0], { rotateX: 0, duration: .25 }, ">-.1")
        .to(select("[data-latch]"), { y: 18, backgroundColor: "#171713", stagger: .08, duration: .18 })
        .fromTo(select("[data-education]")[0], { opacity: .25 }, { opacity: 1, duration: .2 });

      gsap.timeline({ scrollTrigger: { trigger: select("[data-transform]")[0], start: "top 70%", end: "bottom 45%", scrub: true } })
        .to(select("[data-education-card]"), { x: (i) => [-140, 120, -70][i], y: (i) => [180, 230, 155][i], rotate: (i) => [-8, 7, -5][i], stagger: .08 })
        .to(select("[data-education-card]"), { rotateY: 180, backgroundColor: "#d5b988", stagger: .08 })
        .fromTo(select("[data-postcard-copy]"), { opacity: 0 }, { opacity: 1, stagger: .08 }, "<.1");

      return () => {
        document.removeEventListener("visibilitychange", syncContinuous);
        resizeObserver.disconnect();
      };
    }, root);
    return () => context.revert();
  }, []);

  return <div ref={root} className={styles.story}>
    <section data-hero className={styles.hero}>
      <div className={styles.heroSticky}>
        <div className="shell"><p className="eyebrow">Website builder / brand practitioner / left winger</p><h1 className="display">Ideas in motion.<br/>Systems that land.</h1><p className={styles.intro}>{profile.headline}</p></div>
        <div className={styles.pitch}><div data-player className={styles.player}><div data-player-visual className={styles.playerVisual}><Footballer/></div><strong data-handle>{profile.handle}</strong></div></div>
        <p data-wipe-label className={styles.wipeLabel}>The ball opens the work file.</p>
      </div>
    </section>
    <section className={`${styles.work} section`}><div className="shell"><p className="eyebrow">01 / Work in play</p><h2 className="display">A project-led practice.</h2><p className={styles.lead}>Website building, brand systems, content, SEO and practical digital operations across energy, professional services, hospitality and ecommerce.</p><div className={styles.workRows}>{profile.work.map((item) => <article data-work-card key={item.organization}><h3>{item.organization}</h3>{item.role && <p className={styles.role}>{item.role}</p>}<p>{item.summary}</p></article>)}</div><div data-work-card className={styles.github}><span>GitHub field note</span><p>Live contribution totals are not shown without an authenticated source.</p><a className="button" href={profile.social.github} target="_blank" rel="noreferrer">Open GitHub profile</a></div></div></section>
    <section data-pack className={`${styles.caseScene} section`}><div className="shell"><p className="eyebrow">02 / Pack the work</p><div className={styles.caseFiles}>{profile.capabilities.map((capability) => <span data-pack-card key={capability}>{capability}</span>)}</div><div data-briefcase className={styles.briefcase} aria-label="Work cards enter a briefcase, which closes and locks"><div className={styles.handle}/><div data-case-lid className={styles.caseLid}/><div className={styles.caseBase}><i data-latch/><i data-latch/></div></div></div></section>
    <section data-education className={`${styles.education} section`}><div className="shell"><p className="eyebrow">03 / Education</p><h2 className="display">Credentials, filed precisely.</h2><div data-transform className={styles.credentials}>{profile.education.map((item) => <article data-education-card key={item.credential}><div className={styles.cardFront}><p>{item.institution}</p><h3>{item.credential}</h3><p>{item.location}</p>{item.start && item.end ? <time>{educationPeriod(item.start, item.end)}</time> : null}</div><div data-postcard-copy className={styles.cardBack}><small>Listening postcard</small><h3>Formal study, informal influence.</h3><a href={profile.social.spotify} target="_blank" rel="noreferrer">Open in Spotify</a></div></article>)}</div></div></section>
    <section className={`${styles.music} section`}><div className="shell"><p className="eyebrow">04 / Listening room</p><h2 className="display">The postcards have landed.</h2><p>No approved track URIs were supplied. The music route is ready for authorized catalog data and stays useful through Pratham&apos;s verified Spotify profile.</p><a className="button dark" href={profile.social.spotify} target="_blank" rel="noreferrer">Open in Spotify</a></div></section>
  </div>;
}
