"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AuthInitializer from "@/features/auth/components/AuthInitializer";

// ─────────────────────────────────────────────────────────────
// Global Providers
// ─────────────────────────────────────────────────────────────

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Don't refetch on window focus in development
        refetchOnWindowFocus: process.env.NODE_ENV === "production",
        // Retry failed requests once
        retry: 1,
        // Consider data stale after 2 minutes
        staleTime: 2 * 60 * 1000,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: reuse the same client
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* Silently rehydrates auth state on every page load */}
      <AuthInitializer />

      {children}

      {/* Toast notifications */}
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
            maxWidth: "360px",
          },
          success: {
            iconTheme: { primary: "#22c55e", secondary: "white" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "white" },
          },
        }}
      />

      {/* React Query DevTools (dev only) */}
      {process.env.NEXT_PUBLIC_ENABLE_DEVTOOLS === "true" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
