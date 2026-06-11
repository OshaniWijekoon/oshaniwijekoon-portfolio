"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

const PROJECT_OVERRIDES: Record<
  string,
  {
    image?: string;
    description?: string;
    tools?: string[];
  }
> = {};

const VIDEO_SRC = "/ok.mp4";

const TOPIC_IMAGES: { keywords: string[]; url: string }[] = [
  { keywords: ["machine-learning", "ml", "ai", "deep-learning", "pytorch", "tensorflow"], url: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80" },
  { keywords: ["web", "nextjs", "react", "frontend", "html", "css", "javascript", "typescript"], url: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80" },
  { keywords: ["mobile", "android", "ios", "flutter", "kotlin", "swift"], url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80" },
  { keywords: ["data", "analytics", "visualization", "dashboard", "pandas", "sql"], url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" },
  { keywords: ["api", "backend", "server", "node", "python", "django", "flask", "express"], url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" },
  { keywords: ["game", "unity", "pygame", "opengl"], url: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&q=80" },
  { keywords: ["security", "crypto", "blockchain"], url: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&q=80" },
  { keywords: ["devops", "docker", "kubernetes", "cloud", "aws"], url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80" },
];
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80";

function pickImage(repo: Repo): string {
  const haystack = [
    ...(repo.topics ?? []),
    repo.language ?? "",
    repo.name,
  ].map((s) => s.toLowerCase());

  for (const { keywords, url } of TOPIC_IMAGES) {
    if (keywords.some((kw) => haystack.some((h) => h.includes(kw)))) return url;
  }
  return FALLBACK_IMAGE;
}

const langColors: Record<string, string> = {
  JavaScript: "#F7DF1E", TypeScript: "#3178C6", Python: "#3776AB",
  HTML: "#E34F26", CSS: "#1572B6", Java: "#ED8B00", "C++": "#00599C",
  Kotlin: "#7F52FF", Swift: "#FA7343", Dart: "#0175C2", default: "#6B6B6B",
};

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState(1);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    fetch("https://api.github.com/users/OshaniWijekoon/repos?sort=updated&per_page=20")
      .then((r) => r.json())
      .then((data: Repo[]) => {
        const allowed = ["react-quiz-app", "multi-todo-app", "github-profile-analyzer"];
        setRepos(data.filter((r) => allowed.includes(r.name)));
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!repos.length) return;
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const totalScroll = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const index = Math.min(Math.floor(progress * repos.length), repos.length - 1);
      setCurrent((prev) => {
        if (index !== prev) { setDirection(index > prev ? 1 : -1); return index; }
        return prev;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [repos]);

  const repo = repos[current];
  const override = repo ? PROJECT_OVERRIDES[repo.name] ?? {} : {};
  const image = override.image ?? (repo ? pickImage(repo) : FALLBACK_IMAGE);
  const description = override.description ?? repo?.description ?? "No description provided for this project.";
  const tools: string[] = override.tools ?? (repo?.topics?.slice(0, 5) ?? []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{
        height: repos.length > 0 ? `${repos.length * 100}vh` : "100vh",
        position: "relative",
      }}
    >
      {/* ── Video background ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          marginBottom: "-100vh",
          zIndex: 0,
        }}
      >
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoReady(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.1,
            transition: "opacity 0.8s ease",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(193, 182, 182, 0.8) 0%, rgba(109, 103, 98, 0.72) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 60% 50%, rgba(255,90,0,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── Sticky content layer ── */}
      <div
        className="projects-sticky"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 1,
          padding: "0 24px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}>

          {/* ── Header ── */}
          <div className="projects-header">
            <div>
              <span
                className="tag"
                style={{
                  marginBottom: "12px",
                  display: "inline-block",
                  background: "rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.75)",
                  borderColor: "rgba(255,255,255,0.15)",
                }}
              >
                Selected Work
              </span>
              <h2
                className="section-heading"
                style={{ margin: 0, color: "#fff" }}
              >
                Projects I&apos;ve <span className="highlight">built.</span>
              </h2>
            </div>
            <motion.a
              href="https://github.com/OshaniWijekoon"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                borderColor: "rgba(255,255,255,0.35)",
                color: "#fff",
              }}
            >
              View GitHub ↗
            </motion.a>
          </div>

          {/* ── Loading spinner ── */}
          {loading && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{
                  width: "40px", height: "40px",
                  border: "3px solid rgba(255,255,255,0.15)",
                  borderTopColor: "var(--orange)",
                  borderRadius: "50%", margin: "0 auto 16px",
                }}
              />
              <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)" }}>
                Fetching from GitHub…
              </p>
            </div>
          )}

          {/* ── Main layout ── */}
          {!loading && repos.length > 0 && (
            <div className="projects-grid">

              {/* Left — counter + scrubber (hidden on mobile, shown on desktop) */}
              <div className="projects-sidebar">
                <div>
                  <motion.p
                    key={current}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      fontFamily: "var(--font-display)", fontSize: "4rem",
                      fontWeight: 800, color: "var(--orange)", lineHeight: 1, margin: 0,
                    }}
                  >
                    {String(current + 1).padStart(2, "0")}
                  </motion.p>
                  <p style={{
                    fontFamily: "var(--font-body)", fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.45)", margin: "4px 0 0",
                  }}>
                    / {String(repos.length).padStart(2, "0")}
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  {repos.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: i === current ? "26px" : "4px",
                        background: i === current ? "var(--orange)" : "rgba(255,255,255,0.2)",
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ width: "3px", borderRadius: "100px" }}
                    />
                  ))}
                </div>

                <p style={{
                  fontFamily: "var(--font-body)", fontSize: "0.65rem",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase", letterSpacing: "0.12em", lineHeight: 1.6,
                  writingMode: "vertical-rl", transform: "rotate(180deg)", alignSelf: "flex-start",
                }}>
                  Scroll to explore
                </p>
              </div>

              {/* Mobile counter row — only visible on small screens */}
              <div className="projects-mobile-counter">
                <motion.span
                  key={current}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontFamily: "var(--font-display)", fontSize: "2rem",
                    fontWeight: 800, color: "var(--orange)", lineHeight: 1,
                  }}
                >
                  {String(current + 1).padStart(2, "0")}
                </motion.span>
                <span style={{
                  fontFamily: "var(--font-body)", fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.45)",
                }}>
                  / {String(repos.length).padStart(2, "0")}
                </span>
                {/* Horizontal tick dots on mobile */}
                <div style={{ display: "flex", gap: "5px", alignItems: "center", marginLeft: "auto" }}>
                  {repos.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        width: i === current ? "22px" : "4px",
                        background: i === current ? "var(--orange)" : "rgba(255,255,255,0.25)",
                      }}
                      transition={{ duration: 0.3 }}
                      style={{ height: "3px", borderRadius: "100px" }}
                    />
                  ))}
                </div>
              </div>

              {/* Right — card */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  initial={{ opacity: 0, y: direction > 0 ? 60 : -60, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: direction > 0 ? -60 : 60, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="project-card-inner"
                  style={{
                    background: "#fff",
                    border: "1px solid var(--gray-light)",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 16px 60px rgba(0,0,0,0.35)",
                  }}
                >
                  {/* Image panel */}
                  <div className="project-card-image">
                    <Image
                      src={image}
                      alt={repo.name}
                      fill
                      style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
                      unoptimized
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.05) 55%)",
                    }} />

                    {repo.language && (
                      <div style={{
                        position: "absolute", bottom: "12px", left: "12px", zIndex: 2,
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        background: "rgba(255,255,255,0.93)", borderRadius: "100px",
                        padding: "4px 11px", boxShadow: "0 2px 12px rgba(0,0,0,0.14)",
                      }}>
                        <span style={{
                          width: "7px", height: "7px", borderRadius: "50%",
                          background: langColors[repo.language] ?? langColors.default,
                          display: "inline-block",
                        }} />
                        <span style={{
                          fontFamily: "var(--font-body)", fontSize: "0.72rem",
                          fontWeight: 600, color: "var(--gray-dark)",
                        }}>
                          {repo.language}
                        </span>
                      </div>
                    )}

                    {repo.stargazers_count > 0 && (
                      <div style={{
                        position: "absolute", top: "12px", right: "12px", zIndex: 2,
                        background: "rgba(255,255,255,0.93)", borderRadius: "100px",
                        padding: "4px 11px", fontSize: "0.72rem", fontFamily: "var(--font-body)",
                        fontWeight: 600, color: "var(--gray-dark)", boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      }}>
                        ⭐ {repo.stargazers_count}
                      </div>
                    )}
                  </div>

                  {/* Info panel */}
                  <div className="project-card-info">
                    <div>
                      <span className="tag" style={{ marginBottom: "12px", display: "inline-block" }}>
                        {repo.topics?.[0] ?? "Project"}
                      </span>

                      <h3 className="project-card-title">
                        {repo.name.replace(/-/g, " ")}
                      </h3>

                      <p className="project-card-desc">
                        {description}
                      </p>

                      {tools.length > 0 && (
                        <div style={{ marginBottom: "14px" }}>
                          <p style={{
                            fontFamily: "var(--font-body)", fontSize: "0.65rem",
                            textTransform: "uppercase", letterSpacing: "0.1em",
                            color: "var(--gray-mid)", marginBottom: "8px", fontWeight: 600,
                          }}>
                            Built with
                          </p>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {tools.map((t) => (
                              <span key={t} style={{
                                padding: "4px 11px", borderRadius: "100px",
                                background: "var(--orange)", color: "#fff",
                                fontSize: "0.68rem", fontWeight: 600,
                                fontFamily: "var(--font-body)", letterSpacing: "0.02em",
                              }}>
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <motion.a
                        href={repo.html_url} target="_blank" rel="noopener noreferrer"
                        className="btn-orange"
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                        style={{ padding: "9px 18px", fontSize: "0.8rem" }}
                      >
                        GitHub ↗
                      </motion.a>
                      {repo.homepage && (
                        <motion.a
                          href={repo.homepage} target="_blank" rel="noopener noreferrer"
                          className="btn-outline"
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                          style={{ padding: "8px 18px", fontSize: "0.8rem" }}
                        >
                          Live Demo ↗
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {!loading && repos.length === 0 && (
            <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", textAlign: "center" }}>
              No public repositories found.
            </p>
          )}
        </div>
      </div>

      <style>{`
        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          video { display: none; }
        }

        /* ── Header ── */
        .projects-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }

        /* ── Main grid: sidebar + card ── */
        .projects-grid {
          display: grid;
          grid-template-columns: 120px 1fr;
          grid-template-rows: auto;
          gap: 32px;
          align-items: center;
        }

        /* Desktop sidebar */
        .projects-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Mobile counter row — hidden on desktop */
        .projects-mobile-counter {
          display: none;
        }

        /* ── Card shell ── */
        .project-card-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          aspect-ratio: 2 / 1;
          max-height: calc(100vh - 260px);
        }

        /* Image panel */
        .project-card-image {
          position: relative;
          overflow: hidden;
        }

        /* Info panel */
        .project-card-info {
          padding: 28px 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
        }

        .project-card-title {
          font-family: var(--font-display);
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--black);
          margin-bottom: 10px;
          letter-spacing: -0.02em;
          line-height: 1.2;
          text-transform: capitalize;
        }

        .project-card-desc {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--gray-mid);
          line-height: 1.75;
          font-weight: 300;
          margin-bottom: 14px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* ── Tablet (≤ 900px) ── */
        @media (max-width: 900px) {
          .projects-sticky {
            padding: 0 16px !important;
          }

          .projects-header {
            margin-bottom: 14px;
          }

          .projects-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            gap: 14px;
          }

          /* Hide the vertical sidebar on tablet/mobile */
          .projects-sidebar {
            display: none;
          }

          /* Show the horizontal counter row */
          .projects-mobile-counter {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .project-card-inner {
            aspect-ratio: unset;
            max-height: unset;
            /* image left, info right — still side by side on tablet */
          }
        }

        /* ── Small phone (≤ 640px) ── */
        @media (max-width: 640px) {
          .projects-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 12px;
          }

          .project-card-inner {
            /* Stack: image on top, info below */
            grid-template-columns: 1fr !important;
            grid-template-rows: 200px auto;
          }

          /* Image panel needs an explicit height since fill is used */
          .project-card-image {
            height: 200px;
            width: 100%;
          }

          .project-card-info {
            padding: 18px 16px;
            gap: 12px;
          }

          .project-card-title {
            font-size: 1.1rem;
            margin-bottom: 6px;
          }

          .project-card-desc {
            font-size: 0.8rem;
            -webkit-line-clamp: 4;
            margin-bottom: 10px;
          }

          /* Slightly smaller section heading on tiny phones */
          #projects .section-heading {
            font-size: clamp(1.4rem, 6vw, 2rem);
          }
        }

        /* ── Very small phones (≤ 380px) ── */
        @media (max-width: 380px) {
          .project-card-inner {
            grid-template-rows: 160px auto;
          }

          .project-card-image {
            height: 160px;
          }
        }
      `}</style>
    </section>
  );
}