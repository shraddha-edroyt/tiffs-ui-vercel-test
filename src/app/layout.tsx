import type { Metadata } from "next";
import { Quicksand, Roboto, Heebo } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ErrorBoundary from "@/components/feedback/ErrorBoundary";
import { APP_NAME } from "@/config/constants";

// Primary Font (Quicksand)
const fontPrimary = Quicksand({
  subsets: ["latin"],
  variable: "--font-primary",
  display: "swap",
});

// Secondary Font (Heebo)
const fontSecondary = Heebo({
  subsets: ["latin"],
  variable: "--font-secondary",
  display: "swap",
});

// Tertiary Font (Roboto)
const fontTertiary = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-tertiary",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: "Upnix — API Management Platform",
  icons: {
    icon: "/favicon.ico",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root Layout
 *
 * Wraps the entire application with:
 * - Global CSS
 * - Font
 * - ErrorBoundary (catches unhandled errors)
 * - Providers (React Query, Redux, Toaster, AuthInitializer)
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${fontPrimary.variable} ${fontSecondary.variable} ${fontTertiary.variable} `}  suppressHydrationWarning>
      <body>
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
