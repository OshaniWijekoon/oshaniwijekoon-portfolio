"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personal } from "@/data/data";

const WhatsAppIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const copyEmail = () => {
    navigator.clipboard.writeText("oshaniwijekoon28@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setSending(true);
    setError("");
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:oshaniwijekoon28@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }, 1000);
  };

  const socialLinks = [
    { label: "WhatsApp", href: "https://wa.me/94775257094", icon: <WhatsAppIcon />, color: "#25D366" },
    { label: "Email", href: "mailto:oshaniwijekoon28@gmail.com", icon: <EmailIcon />, color: "#F4571A" },
    { label: "GitHub", href: "https://github.com/OshaniWijekoon", icon: <GitHubIcon />, color: "#fff" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/oshani-wijekoon", icon: <LinkedInIcon />, color: "#0A66C2" },
  ];

  return (
    <section
      id="contact" ref={ref}
      style={{ padding: "120px 48px", background: "var(--black)", borderRadius: "32px 32px 0 0", position: "relative", overflow: "hidden" }}
      className="contact-padding"
    >
      <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(244,87,26,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          style={{ marginBottom: "72px", textAlign: "center" }}
        >
          <span className="tag" style={{ background: "rgba(244,87,26,0.15)", color: "var(--orange)", border: "1px solid rgba(244,87,26,0.3)", marginBottom: "24px", display: "inline-block" }}>
            Let's Talk
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 800, color: "#fff", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "24px" }}>
            Got a project?<br /><span style={{ color: "var(--orange)" }}>Let's build it.</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "1rem", color: "rgba(255,255,255,0.5)", maxWidth: "480px", margin: "0 auto 48px", lineHeight: 1.7, fontWeight: 300 }}>
            I'm open to freelance projects, full-time roles, and collaborations. Let's create something great together.
          </p>

          {/* Email buttons */}
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
            <motion.a
              href="mailto:oshaniwijekoon28@gmail.com"
              className="btn-orange"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ fontSize: "1rem", padding: "16px 36px" }}
            >
              Send me an email ↗
            </motion.a>
            <motion.button
              onClick={copyEmail}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "15px 28px", background: "transparent", color: copied ? "#22C55E" : "rgba(255,255,255,0.7)", border: `1.5px solid ${copied ? "#22C55E" : "rgba(255,255,255,0.2)"}`, borderRadius: "100px", fontFamily: "var(--font-body)", fontSize: "0.9rem", fontWeight: 500, cursor: "pointer" }}
            >
              {copied ? "✓ Copied!" : "oshaniwijekoon28@gmail.com"}
            </motion.button>
          </div>

          {/* Social icon buttons — just icons, no text */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            {socialLinks.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: "48px", height: "48px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  transition: "color 0.2s, background 0.2s, border 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = s.color;
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.border = `1px solid ${s.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)";
                }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Message form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ maxWidth: "560px", margin: "0 auto 72px", display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: "4px", textAlign: "center" }}>
            Send a message
          </p>

          <input
            type="text" placeholder="Your name"
            value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontFamily: "var(--font-body)", fontSize: "0.9rem", outline: "none", transition: "border 0.2s" }}
            onFocus={(e) => (e.currentTarget.style.border = "1px solid rgba(244,87,26,0.5)")}
            onBlur={(e) => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)")}
          />

          <input
            type="email" placeholder="Your email"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={{ padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontFamily: "var(--font-body)", fontSize: "0.9rem", outline: "none", transition: "border 0.2s" }}
            onFocus={(e) => (e.currentTarget.style.border = "1px solid rgba(244,87,26,0.5)")}
            onBlur={(e) => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)")}
          />

          <textarea
            placeholder="Your message..."
            value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
            rows={5}
            style={{ padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontFamily: "var(--font-body)", fontSize: "0.9rem", outline: "none", resize: "none", transition: "border 0.2s" }}
            onFocus={(e) => (e.currentTarget.style.border = "1px solid rgba(244,87,26,0.5)")}
            onBlur={(e) => (e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)")}
          />

          {error && <p style={{ fontFamily: "var(--font-body)", fontSize: "0.82rem", color: "#FF6B6B" }}>{error}</p>}

          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            disabled={sending || sent}
            style={{ padding: "14px 28px", borderRadius: "100px", background: sent ? "#22C55E" : "var(--orange)", color: "#fff", border: "none", cursor: sending || sent ? "default" : "pointer", fontFamily: "var(--font-display)", fontSize: "0.9rem", fontWeight: 700, transition: "background 0.3s" }}
          >
            {sent ? "✓ Message sent!" : sending ? "Opening mail..." : "Send message →"}
          </motion.button>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 }}
          style={{ height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "48px" }}
        />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.5 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}
        >
          <a href="#home" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 800, color: "#fff", textDecoration: "none", letterSpacing: "-0.02em" }}>
            {personal.firstName}<span style={{ color: "var(--orange)" }}>.</span>
          </a>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)" }}>
            © {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { label: "GitHub", href: "https://github.com/OshaniWijekoon" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/oshani-wijekoon" },
              { label: "Email", href: "mailto:oshaniwijekoon28@gmail.com" },
            ].map((link) => (
              <motion.a
                key={link.label} href={link.href}
                target="_blank" rel="noopener noreferrer"
                whileHover={{ color: "#F4571A" }}
                style={{ fontFamily: "var(--font-body)", fontSize: "0.825rem", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 500 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-padding { padding: 80px 24px !important; border-radius: 24px 24px 0 0 !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>
    </section>
  );
}