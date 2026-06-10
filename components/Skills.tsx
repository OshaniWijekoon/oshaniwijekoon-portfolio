"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skills } from "@/data/data";

const categories = ["All", "Design", "Frontend", "Backend", "Tools"];

const SkillIcon = ({ name }: { name: string }) => {
  const icons: Record<string, React.ReactElement> = {
    "Figma": (
      <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M19 28.5C19 25.9804 20.0009 23.5641 21.7825 21.7825C23.5641 20.0009 25.9804 19 28.5 19C31.0196 19 33.4359 20.0009 35.2175 21.7825C36.9991 23.5641 38 25.9804 38 28.5C38 31.0196 36.9991 33.4359 35.2175 35.2175C33.4359 36.9991 31.0196 38 28.5 38C25.9804 38 23.5641 36.9991 21.7825 35.2175C20.0009 33.4359 19 31.0196 19 28.5Z" fill="#1ABCFE"/>
        <path d="M0 47.5C0 44.9804 1.00089 42.5641 2.78249 40.7825C4.56408 39.0009 6.98044 38 9.5 38H19V47.5C19 50.0196 17.9991 52.4359 16.2175 54.2175C14.4359 55.9991 12.0196 57 9.5 57C6.98044 57 4.56408 55.9991 2.78249 54.2175C1.00089 52.4359 0 50.0196 0 47.5Z" fill="#0ACF83"/>
        <path d="M19 0V19H28.5C31.0196 19 33.4359 17.9991 35.2175 16.2175C36.9991 14.4359 38 12.0196 38 9.5C38 6.98044 36.9991 4.56408 35.2175 2.78249C33.4359 1.00089 31.0196 0 28.5 0H19Z" fill="#FF7262"/>
        <path d="M0 9.5C0 12.0196 1.00089 14.4359 2.78249 16.2175C4.56408 17.9991 6.98044 19 9.5 19H19V0H9.5C6.98044 0 4.56408 1.00089 2.78249 2.78249C1.00089 4.56408 0 6.98044 0 9.5Z" fill="#F24E1E"/>
        <path d="M0 28.5C0 31.0196 1.00089 33.4359 2.78249 35.2175C4.56408 36.9991 6.98044 38 9.5 38H19V19H9.5C6.98044 19 4.56408 20.0009 2.78249 21.7825C1.00089 23.5641 0 25.9804 0 28.5Z" fill="#A259FF"/>
      </svg>
    ),
    "React.js": (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/>
      </svg>
    ),
    "Next.js": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 01-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 00-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.859 8.292 8.208 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 00-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 01-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 01-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 01.174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 004.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 002.466-2.163 11.944 11.944 0 002.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 00-2.499-.523A33.119 33.119 0 0011.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 01.237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 01.233-.296c.096-.05.13-.054.5-.054z" fill="currentColor"/>
      </svg>
    ),
    "TypeScript": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <rect width="24" height="24" rx="3" fill="#3178C6"/>
        <path d="M13.076 13.664v1.642c.267.137.583.241.95.311.366.07.752.106 1.158.106.395 0 .771-.038 1.126-.114.356-.076.667-.202.934-.38.267-.177.478-.406.632-.687.155-.281.232-.621.232-1.021 0-.295-.043-.553-.13-.773a1.74 1.74 0 00-.382-.577 2.713 2.713 0 00-.612-.434 7.01 7.01 0 00-.826-.352 9.28 9.28 0 01-.531-.216 2.17 2.17 0 01-.364-.213.834.834 0 01-.213-.245.617.617 0 01-.069-.297c0-.099.023-.19.07-.272a.6.6 0 01.2-.208.99.99 0 01.315-.133 1.63 1.63 0 01.41-.048c.109 0 .225.008.346.025.122.017.244.043.366.079.122.036.24.08.354.133.113.053.214.114.301.183V10.09a4.1 4.1 0 00-.84-.205 6.568 6.568 0 00-.972-.068c-.39 0-.762.044-1.114.131a2.699 2.699 0 00-.915.4 1.968 1.968 0 00-.618.677c-.151.272-.226.59-.226.957 0 .474.134.876.401 1.206.268.33.68.607 1.237.832.208.08.4.159.577.236.178.077.33.159.459.246.128.087.229.184.302.29a.65.65 0 01.108.373.601.601 0 01-.068.285.627.627 0 01-.202.22 1.01 1.01 0 01-.327.141 1.8 1.8 0 01-.443.05 2.76 2.76 0 01-.976-.182 2.808 2.808 0 01-.862-.536zm-2.54-3.274H12.6V9H8v1.39h2.036V16h1.5v-5.61z" fill="white"/>
      </svg>
    ),
    "JavaScript": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <rect width="24" height="24" rx="3" fill="#F7DF1E"/>
        <path d="M7.5 17.5c.3.5.7.9 1.5.9.8 0 1.3-.4 1.3-1.1V12h1.7v5.3c0 1.8-1.1 2.7-2.6 2.7-1.4 0-2.2-.7-2.6-1.5l1.7-1zm4.9-.2c.4.6.9 1.1 1.9 1.1.8 0 1.3-.4 1.3-.9 0-.6-.5-.8-1.4-1.2l-.5-.2c-1.4-.6-2.3-1.3-2.3-2.8 0-1.4 1.1-2.5 2.7-2.5 1.2 0 2 .4 2.6 1.4l-1.4 1c-.3-.5-.6-.7-1.1-.7s-.8.3-.8.7c0 .5.3.7 1.1 1l.5.2c1.6.7 2.5 1.4 2.5 2.9 0 1.7-1.3 2.6-3 2.6-1.7 0-2.8-.8-3.3-1.9l1.2-.7z" fill="#333"/>
      </svg>
    ),
    "Tailwind CSS": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M12 6C9.33 6 7.67 7.33 7 10c1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15C19.67 12 21.33 10.67 22 8c-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6zm-4 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C9.39 17.85 10.5 19 13 19c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C11.61 13.15 10.5 12 8 12z" fill="#38BDF8"/>
      </svg>
    ),
    "HTML & CSS": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" fill="#E34F26"/>
      </svg>
    ),
    "Node.js": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.331-.08-.381.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.192-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.084.05-.139.145-.139.243v10.15c0 .097.055.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.943-.922-1.604V6.921c0-.661.352-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.943.924 1.603v10.15c0 .661-.354 1.275-.924 1.604l-8.794 5.076c-.282.164-.6.247-.925.247zm2.717-6.99c-3.855 0-4.663-1.769-4.663-3.254 0-.142.114-.253.256-.253h1.138c.127 0 .233.092.252.217.172 1.163.684 1.749 3.017 1.749 1.857 0 2.646-.42 2.646-1.406 0-.568-.225-.99-3.119-1.274-2.419-.24-3.913-.773-3.913-2.707 0-1.782 1.502-2.843 4.02-2.843 2.827 0 4.227.981 4.402 3.088.006.07-.019.138-.065.189a.252.252 0 01-.186.083h-1.142a.253.253 0 01-.245-.196c-.276-1.221-.943-1.614-2.764-1.614-2.036 0-2.271.709-2.271 1.241 0 .644.28.832 3.02 1.195 2.715.36 4.009.87 4.009 2.773-.002 1.929-1.609 3.012-4.413 3.012z" fill="#339933"/>
      </svg>
    ),
    "Git & GitHub": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437.55.101.75-.239.75-.531 0-.262-.01-.957-.015-1.875-3.059.664-3.705-1.475-3.705-1.475-.501-1.271-1.222-1.61-1.222-1.61-.999-.682.076-.668.076-.668 1.104.078 1.685 1.133 1.685 1.133.981 1.68 2.575 1.195 3.202.913.1-.71.384-1.195.698-1.47-2.441-.278-5.008-1.221-5.008-5.437 0-1.201.428-2.182 1.132-2.952-.114-.278-.491-1.396.107-2.91 0 0 .923-.295 3.025 1.128A10.535 10.535 0 0112 6.534c.935.004 1.876.126 2.754.37 2.1-1.423 3.021-1.128 3.021-1.128.6 1.514.223 2.632.109 2.91.705.77 1.131 1.751 1.131 2.952 0 4.226-2.572 5.156-5.019 5.428.394.341.746 1.01.746 2.036 0 1.47-.014 2.656-.014 3.018 0 .295.197.637.754.529C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11z" fill="#181717"/>
      </svg>
    ),
    "UI/UX Design": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="#A259FF"/>
      </svg>
    ),
    "Prototyping": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm10 5h2v-2h2v-2h-2v-2h-2v2h-2v2h2z" fill="#F24E1E"/>
      </svg>
    ),
    "Design Systems": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="#FF7262"/>
      </svg>
    ),
    "VS Code": (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.261A1 1 0 00.326 8.74L3.899 12 .326 15.26a1 1 0 00.001 1.479L1.65 17.94a.999.999 0 001.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 001.704.29l4.942-2.377A1.5 1.5 0 0024 19.923V4.077a1.5 1.5 0 00-.85-1.49zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" fill="#007ACC"/>
      </svg>
    ),
  };

  return icons[name] || (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
};

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills" ref={ref}
      style={{ padding: "120px 48px", borderRadius: "38px", margin: "0 24px", position: "relative", overflow: "hidden" }}
      className="skills-section"
    >
      {/* Video background */}
      <video
        autoPlay muted loop playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, opacity: 1 }}
      >
        <source src="/osh.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #F7F7F5 0%, #FFF0EB 50%, #F7F7F5 100%)", zIndex: 1, opacity: 0.92 }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "60px", flexWrap: "wrap", gap: "24px" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="tag" style={{ marginBottom: "16px", display: "inline-block" }}>Skills & Tools</span>
            <h2 className="section-heading">What I work<br /><span className="highlight">with.</span></h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }}
            style={{ fontFamily: "var(--font-body)", fontSize: "0.95rem", color: "var(--gray-mid)", maxWidth: "320px", lineHeight: 1.7, fontWeight: 300 }}
          >
            A blend of design and development tools I use to turn ideas into polished products.
          </motion.p>
          <div className="gsap-reveal" style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}></div>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: "flex", gap: "8px", marginBottom: "48px", flexWrap: "wrap" }}
        >
          {categories.map((cat) => (
            <motion.button key={cat} onClick={() => setActiveCategory(cat)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ padding: "8px 20px", borderRadius: "100px", border: "1.5px solid", borderColor: activeCategory === cat ? "var(--orange)" : "var(--gray-light)", background: activeCategory === cat ? "var(--orange)" : "#fff", color: activeCategory === cat ? "#fff" : "var(--gray-mid)", fontFamily: "var(--font-body)", fontSize: "0.825rem", fontWeight: 500, cursor: "pointer", transition: "all 0.2s" }}>
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid — icon cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "16px" }}
            className="skills-grid"
          >
            {filtered.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }}
                whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(244,87,26,0.15)", borderColor: "var(--orange)" }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  gap: "12px", padding: "24px 16px",
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.9)",
                  borderRadius: "20px",
                  cursor: "default",
                  transition: "border 0.2s, box-shadow 0.2s",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <SkillIcon name={skill.name} />
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 600, color: "var(--gray-dark)", textAlign: "center", lineHeight: 1.3 }}>
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.6 }}
          style={{ marginTop: "64px", paddingTop: "40px", borderTop: "1px solid #E0E0DD", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}
        >
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 700, color: "var(--black)" }}>
            Always learning, <span style={{ color: "var(--orange)" }}>always growing.</span>
          </p>
          <motion.a href="#projects" className="btn-orange" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            See my work ↓
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-section { padding: 80px 24px !important; margin: 0 !important; border-radius: 0 !important; }
          .skills-grid { grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)) !important; gap: 12px !important; }
        }
      `}</style>
    </section>
  );
}