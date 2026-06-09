"use client";

import { createContext, useContext, useState } from "react";

const TerminalModeContext = createContext<{
  isTerminalMode: boolean;
  toggleTerminalMode: () => void;
}>({ isTerminalMode: false, toggleTerminalMode: () => {} });

export function useTerminalMode() {
  return useContext(TerminalModeContext);
}

export function TerminalModeProvider({ children }: { children: React.ReactNode }) {
  const [isTerminalMode, setIsTerminalMode] = useState(false);

  const toggleTerminalMode = () => setIsTerminalMode((prev) => !prev);

  return (
    <TerminalModeContext.Provider value={{ isTerminalMode, toggleTerminalMode }}>
      {children}
    </TerminalModeContext.Provider>
  );
}
