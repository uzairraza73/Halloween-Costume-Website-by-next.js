"use client";

import React, { Suspense } from "react";
import { SpookyWoodenNav } from "@/components/layout/SpookyWoodenNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 py-3 bg-[#07050b]/90 backdrop-blur-md border-b border-pumpkin/20 shadow-2xl transition-all">
      <Suspense fallback={<div className="h-16" />}>
        <SpookyWoodenNav />
      </Suspense>
    </header>
  );
}
