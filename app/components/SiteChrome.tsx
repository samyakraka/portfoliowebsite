"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { profile } from "../data";
import { useTheme } from "../contexts/ThemeContext";

// Shared by the home page and /contact, so section links are absolute ("/#work").
export function Header() {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="top">
      <div className="wrap top__bar">
        <Link href="/" className="top__name">
          {profile.name}
        </Link>
        <nav className="top__nav" aria-label="Site">
          <div className="top__links">
            <Link href="/#work">Work</Link>
            <Link href="/#experience">Experience</Link>
            <Link href="/#recognition">Hackathons</Link>
          </div>
          <a href={profile.resume} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
          <Link href="/contact" className="top__cta">
            Contact
          </Link>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
}

export function FooterLinks() {
  return (
    <div className="foot">
      <ul>
        {profile.links.map((l) => (
          <li key={l.label}>
            <a href={l.url} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <p>© {new Date().getFullYear()} Samyak Raka</p>
    </div>
  );
}
