"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { personal } from "@/data/data";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const journey = [
  {
    year: "2023–2024",
    title: "1st Year",
    desc: "Programming fundamentals, Mathematics, IT foundations, OOP concepts",
    status: "done",
  },
  {
    year: "2025",
    title: "2nd Year",
    desc: "Data Structures, Web Dev basics, Database Systems, Software Engineering",
    status: "done",
  },
  {
    year: "2026",
    title: "3rd Year — Now",
    desc: "UI/UX Design, Advanced Web Dev, React & Next.js · 2nd Semester ongoing",
    status: "current",
  },
  {
    year: "2027",
    title: "4th Year",
    desc: "Final year project, Industry internship, Advanced specialization",
    status: "upcoming",
  },
];

const cards = [
  { title: "UI/UX Design", sub: "Figma · Prototyping · Design Systems" },
  { title: "Frontend Dev", sub: "React · Next.js · TypeScript · Tailwind" },
  { title: "5+ Projects", sub: "Self-initiated design & dev experiments" },
  { title: "10+ Skills", sub: "Across design, frontend & dev tools" },
];

export default function About() {
  const ref = useRef(null);
  const journeyRef = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Journey cards stagger on scroll
      gsap.fromTo(
        ".journey-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: journeyRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Journey connector line draw animation
      gsap.fromTo(
        ".journey-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: journeyRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      style={{ position: "relative", padding: "125px 0", overflow: "hidden" }}
    >
      {/* Video background */}
      <video
        autoPlay muted loop playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, opacity: 2 }}
      >
        <source src="/ok.mp4" type="video/mp4" />
      </video>

      {/* Light overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg, #6d6666 0%, rgba(250,250,250,0.96) 100%)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }} className="about-padding">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{ marginBottom: "72px" }}>
          <span className="tag" style={{ marginBottom: "20px", display: "inline-block" }}>About me</span>
          <h2 className="section-heading">
            Designing with <span className="highlight">purpose</span>,<br />building with precision.
          </h2>
        </motion.div>

        {/* Top grid: photo + bio */}
        <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "56px", alignItems: "start", marginBottom: "72px" }} className="about-top-grid">

          {/* Photo card */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            {/* Square photo */}
            <div style={{
              width: "100%", aspectRatio: "1/1", borderRadius: "20px",
              background: "#0a0a0a", overflow: "hidden", position: "relative",
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              border: "1px solid #ccc4c4",
            }}>
              <img
                src="/oshanis.png"
                alt={personal.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              {/* Name overlay at bottom */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "24px 20px 20px",
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
              }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>{personal.name}</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>{personal.title}</p>
              </div>
            </div>

            {/* Status card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4, duration: 0.5 }}
              style={{ marginTop: "14px", padding: "18px 22px", background: "#0A0A0A", borderRadius: "16px", border: "1px solid #1A1A1A", display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
              <div>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "0.82rem", fontWeight: 700, color: "#fff", marginBottom: "3px" }}>SLIIT · 3rd Year</p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>2nd Semester · 2026</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 0 3px rgba(34,197,94,0.2)" }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.7rem", color: "#22C55E", fontWeight: 500 }}>Active</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Bio + cards */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontFamily: "Times New Roman", fontSize: "1.05rem", color: "#2a2a2a", lineHeight: 1.85, fontWeight: 400, marginBottom: "36px" }}
            >
              I'm a 3rd year undergraduate at SLIIT, specializing in Information Technology with a focus on UI/UX design and web development. I love bridging the gap between design and engineering — crafting interfaces that look great and work even better. From academic group projects to personal side builds, I bring both creative thinking and technical precision to everything I make.
            </motion.p>

            {/* 4 dark cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {cards.map((card, i) => (
                <motion.div key={card.title}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  whileHover={{ y: -3, boxShadow: "0 12px 40px rgba(0,0,0,0.15)", borderColor: "var(--orange)" }}
                  style={{ padding: "22px", borderRadius: "14px", background: "#0A0A0A", border: "1px solid #1A1A1A", cursor: "default", transition: "border-color 0.2s ease" }}
                >
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, color: "#fff", marginBottom: "6px" }}>{card.title}</p>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>{card.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.6 }}
              style={{ display: "flex", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}
            >
              <motion.a href={personal.github} target="_blank" rel="noopener noreferrer" className="btn-orange" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{ padding: "11px 24px", fontSize: "0.85rem" }}>GitHub ↗</motion.a>
              <motion.a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} style={{ padding: "11px 24px", fontSize: "0.85rem" }}>LinkedIn ↗</motion.a>
            </motion.div>
          </div>
        </div>

        {/* Academic Journey */}
        <div ref={journeyRef}>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
            style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "var(--black)", marginBottom: "28px" }}
          >
            Academic Journey
          </motion.p>

          {/* Connector line */}
          <div style={{ position: "relative", marginBottom: "16px", height: "2px", background: "var(--gray-light)", borderRadius: "2px", overflow: "hidden" }}>
            <div className="journey-line" style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #0A0A0A 0%, var(--orange) 60%, #e8e8e8 100%)", transformOrigin: "left center" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }} className="journey-grid">
            {journey.map((item) => (
              <div
                key={item.year}
                className="journey-card"
                style={{
                  padding: "22px 18px",
                  borderRadius: "14px",
                  background: item.status === "current" ? "var(--orange)" : item.status === "done" ? "#0A0A0A" : "#F7F7F5",
                  border: `1px solid ${item.status === "current" ? "var(--orange)" : item.status === "done" ? "#1A1A1A" : "var(--gray-light)"}`,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 36px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                {item.status === "current" && (
                  <div style={{ position: "absolute", top: "12px", right: "12px", width: "6px", height: "6px", borderRadius: "50%", background: "#fff", boxShadow: "0 0 0 3px rgba(255,255,255,0.3)" }} />
                )}
                {item.status === "upcoming" && (
                  <div style={{ position: "absolute", top: "12px", right: "12px", width: "6px", height: "6px", borderRadius: "50%", background: "var(--gray-mid)", opacity: 0.4 }} />
                )}

                {/* Year badge */}
                <p style={{
                  fontFamily: "Times New Roman",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  marginBottom: "10px",
                  color: item.status === "current" ? "rgba(255,255,255,0.75)" : item.status === "done" ? "rgba(255,255,255,0.4)" : "var(--gray-mid)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}>
                  {item.year}
                </p>

                {/* Title */}
                <p style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.88rem",
                  fontWeight: 700,
                  color: item.status === "upcoming" ? "var(--gray-mid)" : "#fff",
                  marginBottom: "8px",
                  lineHeight: 1.2,
                }}>
                  {item.title}
                </p>

                {/* Divider */}
                <div style={{
                  width: "24px", height: "1px", marginBottom: "10px",
                  background: item.status === "current" ? "rgba(255,255,255,0.4)" : item.status === "done" ? "rgba(255,255,255,0.15)" : "var(--gray-light)",
                }} />

                {/* Desc */}
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.7rem",
                  color: item.status === "current" ? "rgba(255,255,255,0.8)" : item.status === "done" ? "rgba(255,255,255,0.45)" : "var(--gray-mid)",
                  lineHeight: 1.6,
                  fontWeight: 300,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .journey-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .about-top-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .about-padding { padding: 0 24px !important; }
          .journey-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .journey-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}