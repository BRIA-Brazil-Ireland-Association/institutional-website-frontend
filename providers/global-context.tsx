"use client";

import type { CmsEntry } from "@/services/content";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type GlobalContextValue = {
  globalContent: CmsEntry | null;
};

const GlobalContext = createContext<GlobalContextValue | undefined>(undefined);

type GlobalContextProviderProps = {
  children: ReactNode;
  globalContent: CmsEntry | null;
};

export function GlobalContextProvider({
  children,
  globalContent,
}: GlobalContextProviderProps) {
  const value = useMemo(() => ({ globalContent }), [globalContent]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider.",
    );
  }

  return context;
}
