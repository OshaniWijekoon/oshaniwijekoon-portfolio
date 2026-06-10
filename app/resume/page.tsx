"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ResumePage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0A0A",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 40px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        {/* Back button */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <motion.span
            whileHover={{ x: -4 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.5)",
              fontWeight: 500,
              letterSpacing: "0.04em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            ← Back to Portfolio
          </motion.span>
        </Link>

        {/* Name */}
        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "0.95rem",
          fontWeight: 700,
          color: "#fff",
          margin: 0,
        }}>
          Oshani Wijekoon — Resume
        </p>

        {/* Download button */}
        <motion.a
          href="/resume.pdf"
          download="Oshani_Wijekoon_Resume.pdf"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 22px",
            background: "var(--orange)",
            color: "#fff",
            borderRadius: "100px",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            fontSize: "0.8rem",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          ↓ Download PDF
        </motion.a>
      </motion.div>

      {/* PDF viewer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "32px 24px",
        }}
      >
        <iframe
          src="/resume.pdf"
          style={{
            width: "100%",
            maxWidth: "860px",
            height: "calc(100vh - 120px)",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          }}
          title="Oshani Wijekoon Resume"
        />
      </motion.div>

    </div>
  );
}