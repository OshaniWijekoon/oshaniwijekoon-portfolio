"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GSAPEffects() {
  useEffect(() => {

    // ── 1. Text scramble on hero name only ──
    const scrambleText = (el: HTMLElement, finalText: string) => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz@#$%&";
      let iteration = 0;
      const interval = setInterval(() => {
        el.innerText = finalText
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return finalText[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        if (iteration >= finalText.length) clearInterval(interval);
        iteration += 0.4;
      }, 35);
    };

    setTimeout(() => {
      const el = document.querySelector(".gsap-scramble") as HTMLElement;
      if (el) {
        const original = el.innerText;
        scrambleText(el, original);
      }
    }, 900);

    // ── 2. Magnetic buttons ──
    setTimeout(() => {
      const buttons = document.querySelectorAll<HTMLElement>(".btn-orange, .btn-outline");
      buttons.forEach((btn) => {
        const onMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, { x: x * 0.28, y: y * 0.28, duration: 0.3, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        };
        btn.addEventListener("mousemove", onMove);
        btn.addEventListener("mouseleave", onLeave);
      });
    }, 1500);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}