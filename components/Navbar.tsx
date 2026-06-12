"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personal } from "@/data/data";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: "24px",
          left: 0,
          right: 0,
          margin: "0 auto",
          zIndex: 100,
          width: "fit-content",
          maxWidth: "calc(100vw - 48px)",
        }}
      >
        {/* Floating pill navbar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 8px 8px 20px",
          background: "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.9)",
          borderRadius: "100px",
          boxShadow: scrolled
            ? "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)"
            : "0 4px 24px rgba(0,0,0,0.08)",
          transition: "box-shadow 0.3s ease",
        }}>
          {/* Logo */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1rem",
              color: "var(--black)",
              textDecoration: "none",
              letterSpacing: "-0.02em",
              marginRight: "8px",
              whiteSpace: "nowrap",
            }}
          >
            {personal.firstName}
            <span style={{ color: "var(--orange)" }}>.</span>
          </motion.a>

          {/* Divider */}
          <div style={{ width: "1px", height: "18px", background: "var(--gray-light)", margin: "0 4px" }} />

          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2px" }} className="desktop-nav">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setActive(link.label)}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.4 }}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.82rem",
                  fontWeight: active === link.label ? 600 : 500,
                  color: active === link.label ? "var(--orange)" : "var(--gray-mid)",
                  textDecoration: "none",
                  padding: "7px 14px",
                  borderRadius: "100px",
                  background: active === link.label ? "var(--orange-pale)" : "transparent",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (active !== link.label) {
                    e.currentTarget.style.color = "var(--black)";
                    e.currentTarget.style.background = "#F5F5F5";
                  }
                }}
                onMouseLeave={(e) => {
                  if (active !== link.label) {
                    e.currentTarget.style.color = "var(--gray-mid)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div style={{ width: "1px", height: "18px", background: "var(--gray-light)", margin: "0 4px" }} className="desktop-nav" />

          {/* CTA button */}
          <motion.a
            href="#contact"
            className="desktop-nav"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "9px 18px",
              background: "var(--black)",
              color: "#fff",
              borderRadius: "100px",
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "0.82rem",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--orange)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--black)")}
          >
            Get in touch
            <span style={{
              width: "20px", height: "20px", borderRadius: "50%",
              background: "var(--orange)", display: "inline-flex",
              alignItems: "center", justifyContent: "center", fontSize: "0.7rem",
            }}>→</span>
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
            style={{
              display: "none", flexDirection: "column", gap: "4px",
              background: "none", border: "none", cursor: "pointer", padding: "8px",
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{
                  rotate: menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                  y: menuOpen && i === 0 ? 8 : menuOpen && i === 2 ? -8 : 0,
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
                style={{
                  display: "block", width: "20px", height: "2px",
                  background: "var(--black)", borderRadius: "2px",
                }}
              />
            ))}
          </button>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(250,250,250,0.97)",
              backdropFilter: "blur(20px)",
              zIndex: 99,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: "28px",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => { setActive(link.label); setMenuOpen(false); }}
                style={{
                  fontFamily: "var(--font-display)", fontSize: "2rem",
                  fontWeight: 700, color: "var(--black)", textDecoration: "none",
                }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              className="btn-orange"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Get in touch →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
  }
`}</style>

      
    </>
  );
}