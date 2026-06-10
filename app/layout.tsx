import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oshani Wijekoon — UI/UX & Web Developer",
  description: "Personal portfolio of Oshani Wijekoon, a UI/UX designer and web developer.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}