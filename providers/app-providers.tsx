"use client";

import { GlobalContextProvider } from "@/providers/global-context";
import type { CmsEntry } from "@/services/cms";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
  globalContent: CmsEntry | null;
};

export function AppProviders({ children, globalContent }: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider globalContent={globalContent}>
        {children}
      </GlobalContextProvider>
    </QueryClientProvider>
  );
}
