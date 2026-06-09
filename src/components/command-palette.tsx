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

// --- Palette commands ---

interface Command {
  id: string;
  label: string;
  shortcut: string;
  icon: IconDefinition;
  action: () => void;
  group: string;
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

function navigate(hash: string) {
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}

function openLink(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

// --- Terminal commands ---

const TERMINAL_COMMANDS: Record<string, string> = {
  whoami: `Frank Ji — Front-End Developer based in Auckland, NZ.
Currently building e-commerce experiences at Mitre 10 with Angular & Spartacus.`,
  skills: `Angular • React • TypeScript • Next.js • NgRx • RxJS
Node.js • NestJS • AWS (Lambda, Cognito, SES, DynamoDB)
MongoDB • PostgreSQL • Algolia • Docker`,
  experience: `▸ Front-End Developer @ Mitre 10 (Feb 2024 – Present)
▸ Graduate Teaching Assistant @ University of Auckland (Jul – Nov 2023)
▸ Tutor @ YouTutor Ltd. (Aug – Nov 2023)
▸ Full-Stack Software Engineer @ CentraPass (Jan 2022 – Jun 2023)`,
  education: `▸ BSc (Honours) Software Engineering, First Class — University of Auckland (2019–2023)
▸ NZ Programming Contest — 1st place (2021), 3rd place (2022)
▸ Dean's Honour List 2021 • Summer Research Scholarship 2023–2024`,
  projects: `▸ Remind Me — Serverless morning briefing system (TypeScript, AWS Lambda, SES, DynamoDB)
  github.com/FrankJi1019/remin-me`,
  contact: `Email:    frankjishiyuan@gmail.com
GitHub:   github.com/FrankJi1019
LinkedIn: linkedin.com/in/frank-ji-1019`,
  help: `Available commands:
  whoami      — about me
  skills      — tech stack
  experience  — work history
  education   — qualifications
  projects    — things I've built
  contact     — how to reach me
  clear       — clear terminal
  help        — show this message`,
};

interface TerminalLine {
  type: "input" | "output";
  text: string;
}

// --- Component ---

type Mode = "palette" | "terminal";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("palette");
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", text: 'Welcome! Type "help" for available commands.' },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const filtered = COMMANDS.filter((cmd) => {
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
      setTimeout(() => {
        if (mode === "palette") inputRef.current?.focus();
        else terminalInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen, mode]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function handlePaletteKeyNav(e: React.KeyboardEvent) {
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

  function handleTerminalSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = query.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: "input" as const, text: cmd }];

    if (cmd === "clear") {
      setHistory([]);
    } else {
      const output = TERMINAL_COMMANDS[cmd];
      newHistory.push({
        type: "output",
        text: output ?? `command not found: ${cmd}. Type "help" for available commands.`,
      });
      setHistory(newHistory);
    }

    setQuery("");
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
        {/* Mode tabs */}
        <div className="flex border-b border-[var(--border)]">
          <button
            onClick={() => setMode("palette")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-colors ${
              mode === "palette" ? "text-accent border-b border-accent" : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3 w-3" />
            Search
          </button>
          <button
            onClick={() => setMode("terminal")}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-colors ${
              mode === "terminal" ? "text-accent border-b border-accent" : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <FontAwesomeIcon icon={faTerminal} className="h-3 w-3" />
            Terminal
          </button>
          <kbd className="ml-auto self-center mr-3 rounded border border-[var(--border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--muted)]">
            ESC
          </kbd>
        </div>

        {/* Palette mode */}
        {mode === "palette" && (
          <>
            <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="h-3.5 w-3.5 text-[var(--muted)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handlePaletteKeyNav}
                placeholder="Type a command..."
                className="flex-1 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none font-mono"
              />
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
          </>
        )}

        {/* Terminal mode */}
        {mode === "terminal" && (
          <div
            className="h-72 overflow-y-auto p-4 font-mono text-sm"
            onClick={() => terminalInputRef.current?.focus()}
          >
            {history.map((line, i) => (
              <div key={i} className={`whitespace-pre-wrap ${line.type === "input" ? "text-accent" : "text-[var(--muted)]"}`}>
                {line.type === "input" ? `$ ${line.text}` : line.text}
              </div>
            ))}
            <form onSubmit={handleTerminalSubmit} className="flex items-center mt-1">
              <span className="text-accent">$&nbsp;</span>
              <input
                ref={terminalInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-[var(--foreground)] outline-none"
                autoFocus
              />
            </form>
            <div ref={terminalEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}
