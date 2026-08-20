"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import greeting from "@/public/assets/greetings.json";
import styles from "./Greeting.module.css";
export function Greeting() {
  const [shown, setShown] = useState(false);
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(reduce);
    if (sessionStorage.getItem("greeting-seen")) {
      setShown(true);
      return;
    }
    const safety = window.setTimeout(() => {
      sessionStorage.setItem("greeting-seen", "1");
      setShown(true);
    }, reduce ? 500 : 8_500);
    return () => window.clearTimeout(safety);
  }, []);

  const complete = () => {
    sessionStorage.setItem("greeting-seen", "1");
    setShown(true);
  };

  if (shown) return null;
  return <div className={styles.loader} role="status" aria-label="Hello, Hola, Namaste">
    {reduced === true
      ? <Image src="/assets/greetings.svg" width={600} height={600} alt="" onLoad={() => window.setTimeout(complete, 350)} />
      : reduced === false
        ? <Lottie animationData={greeting} loop={false} onComplete={complete} />
        : null}
    <div><span>Hello</span><span>Hola</span><span>Namaste</span></div>
  </div>;
}
