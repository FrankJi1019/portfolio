"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBriefcase,
  faGraduationCap,
  faDiagramProject,
  faCubes,
  faEnvelope,
  faTerminal,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useTerminalMode } from "./terminal-mode-provider";

interface Command {
  id: string;
  label: string;
  shortcut: string;
  icon: IconDefinition;
  action: () => void;
  group: string;
}

function navigate(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}

function openLink(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

const COMMANDS: Command[] = [
  { id: "about", label: "About", shortcut: "/about", icon: faUser, group: "Navigation", action: () => navigate("#about") },
  { id: "experience", label: "Work Experience", shortcut: "/work", icon: faBriefcase, group: "Navigation", action: () => navigate("#experience") },
  { id: "education", label: "Education", shortcut: "/edu", icon: faGraduationCap, group: "Navigation", action: () => navigate("#education") },
  { id: "projects", label: "Projects", shortcut: "/projects", icon: faDiagramProject, group: "Navigation", action: () => navigate("#projects") },
  { id: "skills", label: "Skills", shortcut: "/skills", icon: faCubes, group: "Navigation", action: () => navigate("#skills") },
  { id: "contact", label: "Contact", shortcut: "/contact", icon: faEnvelope, group: "Navigation", action: () => navigate("#contact") },
  { id: "github", label: "GitHub", shortcut: "/github", icon: faGithub, group: "Links", action: () => openLink("https://github.com/FrankJi1019") },
  { id: "linkedin", label: "LinkedIn", shortcut: "/linkedin", icon: faLinkedin, group: "Links", action: () => openLink("https://www.linkedin.com/in/frank-ji-1019") },
  { id: "email", label: "Email", shortcut: "/email", icon: faEnvelope, group: "Links", action: () => openLink("mailto:frankjishiyuan@gmail.com") },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isTerminalMode, toggleTerminalMode } = useTerminalMode();

  const allCommands: Command[] = [
    ...COMMANDS,
    {
      id: "terminal",
      label: isTerminalMode ? "Exit Terminal" : "Open Terminal",
      shortcut: "/terminal",
      icon: faTerminal,
      group: "Mode",
      action: () => toggleTerminalMode(),
    },
  ];

  const filtered = allCommands.filter((cmd) => {
    const q = query.toLowerCase();
    return cmd.label.toLowerCase().includes(q) || cmd.shortcut.includes(q);
  });

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function handleKeyNav(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      filtered[activeIndex].action();
      setIsOpen(false);
    }
  }

  if (!isOpen) return null;

  const groups = filtered.reduce<Record<string, Command[]>>((acc, cmd) => {
    (acc[cmd.group] ??= []).push(cmd);
    return acc;
  }, {});

  let itemIndex = -1;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-lg rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-2xl shadow-accent/5">
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3.5 w-3.5 text-[var(--muted)]" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyNav}
            placeholder="Type a command..."
            className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none font-mono"
          />
          <kbd className="rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted)]">
            ESC
          </kbd>
        </div>
        <div className="max-h-64 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-4 text-center text-sm text-[var(--muted)]">No results found.</p>
          )}
          {Object.entries(groups).map(([group, commands]) => (
            <div key={group}>
              <p className="px-3 pt-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--muted)]">
                {group}
              </p>
              {commands.map((cmd) => {
                itemIndex++;
                const isActive = itemIndex === activeIndex;
                return (
                  <button
                    key={cmd.id}
                    ref={(el) => { if (isActive) el?.scrollIntoView({ block: "nearest" }); }}
                    onClick={() => { cmd.action(); setIsOpen(false); }}
                    className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-[var(--foreground)] hover:bg-accent/5"
                    }`}
                  >
                    <FontAwesomeIcon icon={cmd.icon} className="h-3.5 w-3.5" />
                    {cmd.label}
                    <span className="ml-auto font-mono text-[11px] text-[var(--muted)]">
                      {cmd.shortcut}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
