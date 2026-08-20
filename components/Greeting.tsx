"use client";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import greeting from "@/public/assets/greetings.json";
import styles from "./Greeting.module.css";
export function Greeting(){const [shown,setShown]=useState(false);const [reduced,setReduced]=useState(true);useEffect(()=>{const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;setReduced(reduce);if(sessionStorage.getItem("greeting-seen")){setShown(true);return}const id=setTimeout(()=>{sessionStorage.setItem("greeting-seen","1");setShown(true)},reduce?250:1700);return()=>clearTimeout(id)},[]);if(shown)return null;return <div className={styles.loader} role="status" aria-label="Hello, Hola, Namaste">{reduced?<img src="/assets/greetings.svg" alt=""/>:<Lottie animationData={greeting} loop/>}<div><span>Hello</span><span>Hola</span><span>Namaste</span></div></div>}
