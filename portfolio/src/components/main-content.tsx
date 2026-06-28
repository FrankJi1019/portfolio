"use client";

import { useTerminalMode } from "./terminal-mode-provider";
import { Terminal } from "./terminal";
import { Footer } from "./footer";

export function MainContent({ children }: { children: React.ReactNode }) {
  const { isTerminalMode, toggleTerminalMode } = useTerminalMode();

  if (isTerminalMode) {
    return (
      <div className="overflow-hidden">
        <Terminal onExit={toggleTerminalMode} />
      </div>
    );
  }

  return (
    <>
      {children}
      <Footer />
    </>
  );
}
