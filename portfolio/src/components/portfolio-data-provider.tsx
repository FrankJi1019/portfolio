"use client";

import { createContext, useContext } from "react";
import type { PortfolioData } from "@/data/portfolio";

const PortfolioDataContext = createContext<PortfolioData | null>(null);

export function usePortfolioData(): PortfolioData {
  const data = useContext(PortfolioDataContext);
  if (!data) {
    throw new Error("usePortfolioData must be used within a PortfolioDataProvider");
  }
  return data;
}

interface PortfolioDataProviderProps {
  data: PortfolioData;
  children: React.ReactNode;
}

export function PortfolioDataProvider({ data, children }: PortfolioDataProviderProps) {
  return (
    <PortfolioDataContext value={data}>
      {children}
    </PortfolioDataContext>
  );
}
