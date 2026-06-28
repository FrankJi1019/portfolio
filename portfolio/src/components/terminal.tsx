"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ABOUT, EXPERIENCE, EDUCATION, PROJECTS, SKILLS, CONTACT, CERTIFICATIONS } from "@/data/portfolio";

interface OutputLine {
  id: number;
  type: "command" | "response" | "error" | "ascii";
  text: string;
}

const ASCII_BANNER = `  _____ ____    _    _   _ _  __    _ ___
 |  ___|  _ \\  / \\  | \\ | | |/ /   | |_ _|
 | |_  | |_) |/ _ \\ |  \\| | ' / _  | || |
 |  _| |  _ </ ___ \\| |\\  | . \\| |_| || |
 |_|   |_| \\_\\_/  \\_\\_| \\_|_|\\_\\\\___/|___|`;

const HELP_TEXT = `Available commands:
  about          — Who I am
  experience     — Work history
  education      — Academic background
  certifications — Credentials
  projects       — Things I've built
  skills         — Tech stack
  contact        — Get in touch
  clear          — Clear the terminal
  exit           — Return to normal view
  help           — Show this message`;

function formatAbout(): string {
  return `━━━ ABOUT ME ━━━

${ABOUT.replace(/\n\n/g, " ")}`;
}

function formatExperience(): string {
  const entries = EXPERIENCE.map((role) =>
    `▸ ${role.title} @ ${role.company}
  ${role.period}
${role.points.map((p) => `  • ${p}`).join("\n")}
`
  ).join("\n");
  return `━━━ WORK EXPERIENCE ━━━

${entries}`;
}

function formatEducation(): string {
  const entries = EDUCATION.map((edu) =>
    `▸ ${edu.institution}
  ${edu.degree}
  ${edu.period}
${edu.achievements.map((a) => `  • ${a}`).join("\n")}
`
  ).join("\n");
  return `━━━ EDUCATION ━━━

${entries}`;
}

function formatProjects(): string {
  const entries = PROJECTS.map((p) =>
    `▸ ${p.title}
  ${p.description}
  Tech: ${p.tech.join(" · ")}${p.link ? `\n  Link: ${p.link}` : ""}
`
  ).join("\n");
  return `━━━ PROJECTS ━━━

${entries}`;
}

function formatSkills(): string {
  const entries = SKILLS.map((cat) =>
    `▸ ${cat.label}
  ${cat.items.join(" · ")}`
  ).join("\n\n");
  return `━━━ SKILLS ━━━

${entries}`;
}

function formatCertifications(): string {
  const entries = CERTIFICATIONS.map((c) =>
    `▸ ${c.name}
  ${c.issuer}
  Issued: ${c.issued} · Expires: ${c.expires}${c.credlyUrl ? `\n  ${c.credlyUrl}` : ""}
`
  ).join("\n");
  return `━━━ CERTIFICATIONS ━━━

${entries}`;
}

function formatContact(): string {
  const entries = CONTACT.map((c) => `▸ ${c.label}: ${c.display}`).join("\n");
  return `━━━ CONTACT ━━━

${entries}`;
}

function processCommand(input: string): { text: string; type: "response" | "error" | "ascii" } {
  const cmd = input.trim().toLowerCase();
  switch (cmd) {
    case "help":
      return { text: HELP_TEXT, type: "response" };
    case "about":
      return { text: formatAbout(), type: "response" };
    case "experience":
      return { text: formatExperience(), type: "response" };
    case "education":
      return { text: formatEducation(), type: "response" };
    case "certifications":
      return { text: formatCertifications(), type: "response" };
    case "projects":
      return { text: formatProjects(), type: "response" };
    case "skills":
      return { text: formatSkills(), type: "response" };
    case "contact":
      return { text: formatContact(), type: "response" };
    case "":
      return { text: "", type: "response" };
    default:
      return { text: `command not found: ${cmd}. Type "help" for available commands.`, type: "error" };
  }
}

export function Terminal({ onExit }: { onExit: () => void }) {
  const [output, setOutput] = useState<OutputLine[]>([
    { id: 0, type: "ascii", text: ASCII_BANNER },
    { id: 1, type: "response", text: 'Welcome to Frank Ji\'s portfolio. Type "help" to get started.' },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(2);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input;
    const commandLine: OutputLine = { id: idRef.current++, type: "command", text: cmd };

    if (cmd.trim().toLowerCase() === "clear") {
      setOutput([
        { id: idRef.current++, type: "ascii", text: ASCII_BANNER },
        { id: idRef.current++, type: "response", text: 'Welcome to Frank Ji\'s portfolio. Type "help" to get started.' },
      ]);
      setInput("");
      setHistory((h) => [...h, cmd]);
      setHistoryIndex(-1);
      return;
    }

    if (cmd.trim().toLowerCase() === "exit") {
      onExit();
      return;
    }

    const result = processCommand(cmd);
    const responseLine: OutputLine = { id: idRef.current++, type: result.type, text: result.text };

    setOutput((prev) => [...prev, commandLine, ...(result.text ? [responseLine] : [])]);
    if (cmd.trim()) setHistory((h) => [...h, cmd]);
    setHistoryIndex(-1);
    setInput("");
  }, [input, onExit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      if (history[newIndex]) {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= history.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    }
  };

  return (
    <div
      className="mx-auto flex h-[calc(100vh-73px)] max-w-4xl flex-col px-6 py-6 font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 space-y-1 overflow-y-auto scrollbar-hide">
        {output.map((line) => (
          <div
            key={line.id}
            className={`whitespace-pre-wrap ${
              line.type === "command"
                ? "text-accent"
                : line.type === "error"
                ? "text-red-400"
                : line.type === "ascii"
                ? "text-accent/70 whitespace-pre"
                : "text-[var(--muted)]"
            }`}
          >
            {line.type === "command" ? `❯ ${line.text}` : line.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2 border-t border-[var(--border)] pt-4">
        <span className="text-accent">❯</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-[var(--foreground)] placeholder:text-[var(--muted)]/50"
          placeholder="type a command..."
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
