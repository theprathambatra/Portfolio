"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, KeyboardEvent, PointerEvent } from "react";
import sitesData from "@/content/websites.json";
import styles from "./WorkOrbit.module.css";

type Point = { x: number; y: number; z: number };
type Rotation = { x: number; y: number };
type ReferencePreview = { src: string; crop: "top" | "bottom" };
type SphereStyle = CSSProperties & Record<"--x" | "--y" | "--scale" | "--fade", string>;

const suppliedPreview: Record<string, ReferencePreview> = {
  swawlambi: { src: "/reference/byob/page-4.webp", crop: "top" },
  vedaprint: { src: "/reference/byob/page-5.webp", crop: "top" },
  dalcia: { src: "/reference/byob/page-5.webp", crop: "bottom" },
  whattacart: { src: "/reference/byob/page-6.webp", crop: "top" },
  hashtagg: { src: "/reference/byob/page-6.webp", crop: "bottom" },
};

const INITIAL_ROTATION: Rotation = { x: -0.16, y: 0.28 };
const PERSPECTIVE = 720;

function spherePoints(total: number, radius: number): Point[] {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: total }, (_, index) => {
    const vertical = 1 - (2 * (index + 0.5)) / total;
    const ring = Math.sqrt(1 - vertical * vertical);
    const angle = index * goldenAngle;
    return {
      x: Math.cos(angle) * ring * radius,
      y: vertical * radius,
      z: Math.sin(angle) * ring * radius,
    };
  });
}

function project(point: Point, rotation: Rotation) {
  const cosY = Math.cos(rotation.y);
  const sinY = Math.sin(rotation.y);
  const xAfterY = point.x * cosY + point.z * sinY;
  const zAfterY = -point.x * sinY + point.z * cosY;
  const cosX = Math.cos(rotation.x);
  const sinX = Math.sin(rotation.x);
  const yAfterX = point.y * cosX - zAfterY * sinX;
  const zAfterX = point.y * sinX + zAfterY * cosX;
  const perspectiveScale = PERSPECTIVE / (PERSPECTIVE - zAfterX);
  const scale = Math.min(1.22, Math.max(0.62, perspectiveScale));
  const fade = Math.min(1, Math.max(0.34, 0.68 + zAfterX / 620));
  return { x: xAfterY * perspectiveScale, y: yAfterX * perspectiveScale, z: zAfterX, scale, fade };
}

function initialStyle(point: Point): SphereStyle {
  const position = project(point, INITIAL_ROTATION);
  return {
    "--x": `${position.x}px`,
    "--y": `${position.y}px`,
    "--scale": String(position.scale),
    "--fade": String(position.fade),
    zIndex: Math.round(position.z + 300),
  };
}

export default function WorkOrbit() {
  const sites = sitesData.sites;
  const points = useMemo(() => spherePoints(sites.length, 214), [sites.length]);
  const [active, setActive] = useState(0);
  const [captured, setCaptured] = useState<Record<string, string>>({});
  const [previewFailed, setPreviewFailed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const nodeRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rotationRef = useRef<Rotation>({ ...INITIAL_ROTATION });
  const dragRef = useRef<null | { id: number; x: number; y: number; rotation: Rotation }>(null);
  const hoveredRef = useRef(false);
  const focusedRef = useRef(false);

  const selected = sites[active];
  const capturedPreview = captured[selected.id];
  const referencePreview = capturedPreview ? undefined : suppliedPreview[selected.id];
  const preview = capturedPreview ?? referencePreview?.src;

  const paint = useCallback(() => {
    points.forEach((point, index) => {
      const node = nodeRefs.current[index];
      if (!node) return;
      const position = project(point, rotationRef.current);
      node.style.setProperty("--x", `${position.x}px`);
      node.style.setProperty("--y", `${position.y}px`);
      node.style.setProperty("--scale", String(position.scale));
      node.style.setProperty("--fade", String(position.fade));
      node.style.zIndex = String(Math.round(position.z + 300));
    });
  }, [points]);

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/previews/manifest.json", { signal: controller.signal })
      .then((response) => response.ok ? response.json() as Promise<Record<string, string>> : {})
      .then((manifest) => setCaptured(manifest))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    paint();
    if (reducedMotion) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(34, now - previous);
      previous = now;
      if (!dragRef.current && !hoveredRef.current && !focusedRef.current && !document.hidden) {
        rotationRef.current.y += elapsed * 0.00012;
        paint();
      }
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [paint, reducedMotion]);

  useEffect(() => setPreviewFailed(false), [active, preview]);

  const beginDrag = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      rotation: { ...rotationRef.current },
    };
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.id !== event.pointerId) return;
    rotationRef.current = {
      x: Math.max(-0.72, Math.min(0.72, drag.rotation.x - (event.clientY - drag.y) * 0.005)),
      y: drag.rotation.y + (event.clientX - drag.x) * 0.006,
    };
    paint();
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.id !== event.pointerId) return;
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const moveFocus = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % sites.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + sites.length) % sites.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = sites.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    nodeRefs.current[next]?.focus();
  };

  return <div className={styles.wrap}>
    <div
      className={styles.sphere}
      role="group"
      aria-label="Draggable spherical display of eighteen website projects"
      onPointerDown={beginDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerEnter={() => { hoveredRef.current = true; }}
      onPointerLeave={() => { hoveredRef.current = false; }}
      onFocusCapture={() => { focusedRef.current = true; }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) focusedRef.current = false;
      }}
    >
      <p className={styles.dragHint}>{reducedMotion ? "Static spherical index" : "Drag the field or use arrow keys"}</p>
      {sites.map((site, index) => <button
        ref={(node) => { nodeRefs.current[index] = node; }}
        key={site.id}
        className={styles.node}
        style={initialStyle(points[index])}
        aria-pressed={active === index}
        onClick={() => setActive(index)}
        onFocus={() => setActive(index)}
        onKeyDown={(event) => moveFocus(event, index)}
      ><span>{String(index + 1).padStart(2, "0")}</span>{site.name}</button>)}
    </div>

    <div className={styles.mobileRail} aria-label="Swipe through website projects">
      {sites.map((site, index) => <button key={site.id} aria-pressed={active === index} onClick={() => setActive(index)}><span>{String(index + 1).padStart(2, "0")}</span>{site.name}</button>)}
    </div>

    <aside className={styles.detail} aria-live="polite">
      <div className={styles.preview} data-reference-crop={referencePreview?.crop}>
        {preview && !previewFailed
          ? <Image key={preview} src={preview} alt={`Website preview for ${selected.name}`} fill sizes="(max-width: 900px) 90vw, 32vw" onError={() => setPreviewFailed(true)} />
          : <div className={styles.fallback}><span>{selected.name.slice(0, 2).toUpperCase()}</span><p>Live preview pending capture</p></div>}
      </div>
      <p className="eyebrow">Selected coordinate {String(active + 1).padStart(2, "0")}</p>
      <h2 className="display">{selected.name}</h2>
      <p>{selected.category}</p>
      {referencePreview ? <p className={styles.previewNote}>Cropped from the supplied portfolio reference. Unsupported result claims are excluded.</p> : null}
      <a className="button dark" href={selected.url} target="_blank" rel="noreferrer">Visit site</a>
    </aside>
  </div>;
}
