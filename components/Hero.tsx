"use client";

import { motion } from "framer-motion";
import { personal, marqueeItems } from "@/data/data";

export default function Hero() {
  return (
    <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      {/* Video background */}
      <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, opacity: 0.5 }}>
        <source src="/kavi.mp4" type="video/mp4" />
      </video>
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,240,235,0.5) 50%, rgba(255,228,214,0.45) 100%)" }} />
      <div style={{ position: "absolute", top: "-10%", right: "-5%", zIndex: 2, width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(244,87,26,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Center content */}
      <div style={{
        position: "relative", zIndex: 3,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 48px 60px",
      }}>
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "40px", padding: "6px 16px", background: "#fff", borderRadius: "100px", border: "1px solid var(--gray-light)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C55E", display: "inline-block", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.78rem", color: "var(--gray-mid)", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Available for work
          </span>
        </motion.div>

        {/* Hey I'm */}
        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "1.2rem", color: "var(--gray-mid)", marginBottom: "12px", fontWeight: 300, fontStyle: "italic" }}
        >
          Hey, I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 8vw, 7rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.03em", color: "var(--black)", marginBottom: "20px" }}
        >
          Oshani<br />
          <span className="gsap-scramble" style={{ color: "var(--orange)" }}>Wijekoon</span>
        </motion.h1>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
          style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--gray-mid)", fontWeight: 400, marginBottom: "48px", letterSpacing: "0.02em" }}
        >
          {personal.title}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}
          style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}
        >
          <motion.a
  href="/resume"
  className="btn-orange"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.97 }}
>
  View Resume <span>↗</span>
</motion.a>
          <motion.a href="#projects" className="btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            See Projects
          </motion.a>
        </motion.div>
      </div>

      {/* Curved dark strip */}
      <motion.div
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }}
        style={{ position: "relative", zIndex: 4, background: "var(--black)", borderRadius: "32px 32px 0 0", padding: "28px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}
        className="hero-strip-padding"
      >
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", fontWeight: 400, maxWidth: "100px", lineHeight: 1.4, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Trusted by<br />teams I've<br />helped shape
        </p>
        <div style={{ flex: 1, overflow: "hidden", margin: "0 24px" }}>
          <div className="animate-marquee" style={{ display: "flex", gap: "40px", whiteSpace: "nowrap", width: "max-content", alignItems: "center" }}>
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} style={{ fontFamily: "var(--font-display)", fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: i % 2 === 0 ? "rgba(255,255,255,0.7)" : "var(--orange)", display: "flex", alignItems: "center", gap: "40px" }}>
                {item}<span style={{ color: "rgba(255,255,255,0.15)" }}>◆</span>
              </span>
            ))}
          </div>
        </div>
        <motion.a href="#contact" className="btn-orange" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{ fontSize: "0.825rem", padding: "11px 22px", flexShrink: 0 }}>
          Get in touch →
        </motion.a>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .hero-strip-padding { padding: 24px !important; border-radius: 24px 24px 0 0 !important; }
        }
      `}</style>
    </section>
  );
}