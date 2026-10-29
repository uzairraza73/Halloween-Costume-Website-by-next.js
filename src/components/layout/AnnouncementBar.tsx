"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const messages = [
  "🎃 FREE SHIPPING on orders over $75 — Limited Time!",
  "🕷️ NEW Halloween 2026 Collections Just Dropped!",
  "💀 Use code SPOOKY20 for 20% OFF your first order!",
  "🦇 Over 200+ Premium Costumes — Shop the Full Collection!",
  "🔥 Trending: Shadow Reaper Elite — Only 15 Left in Stock!",
  "🎃 FREE SHIPPING on orders over $75 — Limited Time!",
  "🕷️ NEW Halloween 2026 Collections Just Dropped!",
  "💀 Use code SPOOKY20 for 20% OFF your first order!",
  "🦇 Over 200+ Premium Costumes — Shop the Full Collection!",
  "🔥 Trending: Shadow Reaper Elite — Only 15 Left in Stock!",
];

export function AnnouncementBar() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || pathname === "/") return null;


  return (
    <div className="bg-pumpkin/10 border-b border-pumpkin/20 py-2 overflow-hidden relative">
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "ticker 30s linear infinite" }}
      >
        {messages.map((msg, i) => (
          <span
            key={i}
            className="text-sm font-medium text-pumpkin px-8 flex items-center gap-2 shrink-0"
          >
            {msg}
            <span className="text-pumpkin/40 mx-4">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
