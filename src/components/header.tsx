"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#" aria-label="Home">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer hexagon frame */}
            <path d="M16 2L28.5 9V23L16 30L3.5 23V9L16 2Z" stroke="currentColor" strokeWidth="1.5" className="text-accent" />
            {/* Inner F letterform with circuit nodes */}
            <path d="M11 10H21M11 10V22M11 16H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent" />
            {/* Circuit dots */}
            <circle cx="21" cy="10" r="1.5" fill="currentColor" className="text-accent" />
            <circle cx="18" cy="16" r="1.5" fill="currentColor" className="text-accent" />
            <circle cx="11" cy="22" r="1.5" fill="currentColor" className="text-accent" />
          </svg>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="rounded-md p-2 text-[var(--muted)] md:hidden"
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full border-t border-[var(--border)] bg-[var(--background)] px-6 py-4 shadow-lg md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
