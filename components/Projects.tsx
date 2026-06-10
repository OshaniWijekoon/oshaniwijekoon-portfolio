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

// ─────────────────────────────────────────────────────────────────────────────
// EDIT THIS MAP to customise any repo.
// Key = exact GitHub repo name.  All fields are optional — omitted fields
// fall back to the GitHub data / auto-selected placeholder image.
// ─────────────────────────────────────────────────────────────────────────────
const PROJECT_OVERRIDES: Record<
  string,
  {
    image?: string;
    description?: string;
    tools?: string[];
  }
> = {
  // Example:
  // "my-cool-app": {
  //   image: "https://your-cdn.com/my-cool-app.png",
  //   description: "A full-stack SaaS for managing team tasks in real time.",
  //   tools: ["Next.js", "Prisma", "Tailwind", "PostgreSQL"],
  // },
};

// ─────────────────────────────────────────────────────────────────────────────
// VIDEO BACKGROUND
// • Primary  : /public/projects-bg.mp4  (drop your own video here)
// • Fallback : a free Cloudflare-hosted abstract tech loop
// ─────────────────────────────────────────────────────────────────────────────
const VIDEO_SRC = "/ok.mp4"; // swap to an external URL if you prefer

// ─────────────────────────────────────────────────────────────────────────────
// Fallback Unsplash images — chosen by topic / language keyword
// ─────────────────────────────────────────────────────────────────────────────
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
})
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
      {/* ── Video background (sticky, fills the viewport while section is in view) ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          // pull it up so the sticky content div sits on top
          marginBottom: "-100vh",
          zIndex: 0,
        }}
      >
        {/* Actual video */}
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

        {/* Dark overlay — tweak opacity to taste (0.65–0.80 recommended) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(193, 182, 182, 0.8) 0%, rgba(109, 103, 98, 0.72) 100%)",
          }}
        />

        {/* Subtle orange vignette in the center to guide the eye toward the card */}
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

      {/* ── Sticky content layer (sits on top of the video layer) ── */}
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
          padding: "0 24px",  /* side gutters on small screens */
        }}
      >
        {/* centered container — matches navbar max-width */}
        <div style={{ maxWidth: "1200px", width: "100%", margin: "0 auto" }}>
        {/* ── Header ── */}
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          marginBottom: "36px", flexWrap: "wrap", gap: "16px",
        }}>
          <div>
            <span
              className="tag"
              style={{
                marginBottom: "12px",
                display: "inline-block",
                // override tag colours for dark bg
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
          <div
            className="projects-grid"
            style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "48px", alignItems: "center" }}
          >
            {/* Left — counter + scrubber */}
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
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

              {/* Progress ticks */}
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
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  aspectRatio: "2 / 1",
                  boxShadow: "0 16px 60px rgba(0,0,0,0.35)",
                  maxHeight: "calc(100vh - 280px)",
                }}
              >
                {/* Image panel */}
                <div style={{ position: "relative", overflow: "hidden" }}>
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
                      position: "absolute", bottom: "16px", left: "16px", zIndex: 2,
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      background: "rgba(255,255,255,0.93)", borderRadius: "100px",
                      padding: "5px 13px", boxShadow: "0 2px 12px rgba(0,0,0,0.14)",
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
                      position: "absolute", top: "16px", right: "16px", zIndex: 2,
                      background: "rgba(255,255,255,0.93)", borderRadius: "100px",
                      padding: "4px 11px", fontSize: "0.72rem", fontFamily: "var(--font-body)",
                      fontWeight: 600, color: "var(--gray-dark)", boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}>
                      ⭐ {repo.stargazers_count}
                    </div>
                  )}
                </div>

                {/* Info panel */}
                <div style={{
                  padding: "32px 30px",
                  display: "flex", flexDirection: "column", justifyContent: "space-between",
                  overflow: "hidden",
                }}>
                  <div>
                    <span className="tag" style={{ marginBottom: "14px", display: "inline-block" }}>
                      {repo.topics?.[0] ?? "Project"}
                    </span>

                    <h3 style={{
                      fontFamily: "var(--font-display)", fontSize: "1.45rem", fontWeight: 800,
                      color: "var(--black)", marginBottom: "10px", letterSpacing: "-0.02em",
                      lineHeight: 1.2, textTransform: "capitalize",
                    }}>
                      {repo.name.replace(/-/g, " ")}
                    </h3>

                    <p style={{
                      fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--gray-mid)",
                      lineHeight: 1.75, fontWeight: 300, marginBottom: "18px",
                      display: "-webkit-box", WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical", overflow: "hidden",
                    }}>
                      {description}
                    </p>

                    {tools.length > 0 && (
                      <div style={{ marginBottom: "18px" }}>
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
        </div> {/* end centered container */}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .projects-sticky { padding: 0 16px !important; }
          .projects-grid  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .project-card-inner {
            grid-template-columns: 1fr !important;
            aspect-ratio: unset !important;
          }
          .project-card-inner > div:first-child {
            aspect-ratio: 1 / 1;
            position: relative;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          video { display: none; }
        }
      `}</style>
    </section>
  );
}