import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import ConditionalShell from "@/components/ConditionalShell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Wedding Cards UK",
  description: "Luxury wedding invitations, personalised for your story.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorantGaramond.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
