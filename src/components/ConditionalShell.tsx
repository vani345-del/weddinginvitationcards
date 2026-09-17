"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDemo = pathname.startsWith("/demo");

  return (
    <>
      {!isDemo && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isDemo && <Footer />}
    </>
  );
}
