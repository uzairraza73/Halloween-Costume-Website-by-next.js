"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useStore, useCartCount } from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";

// ─── Costumes Mega Menu columns (exactly per spec) ───────────────────────────
const COSTUMES_COLUMNS = [
  {
    title: "Shop All Costume Characters",
    items: [
      "Addams Family", "American Girl", "Barbie", "Beetlejuice", "Disney",
      "Flintstones", "Ghostbusters", "Harry Potter", "Jurassic World",
      "House of the Dragon", "K-Pop Demon Hunters", "Looney Tunes",
      "Peanuts", "Scooby-Doo", "SpongeBob", "Teenage Mutant Ninja Turtles",
    ],
  },
  {
    title: "Shop All Costume Themes",
    items: [
      "Couple, Group & Costume Sets", "Classics", "Career & Occupation",
      "Candy Brands", "Horror & Fright", "Inflatable", "Funny",
      "Superheroes", "Wheelchair & Wagon Covers",
    ],
  },
  {
    title: "Shop All Adult Costumes",
    items: [
      "Women's Costumes", "Men's Costumes", "Unisex Costumes",
      "Plus Size Costumes", "Couple & Group Costumes", "Sexy Costumes",
    ],
  },
  {
    title: "Shop All Kids' Costumes",
    items: [
      "Baby & Infant Costumes", "Boys' Costumes", "Girls' Costumes",
    ],
  },
];

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function SpookyWoodenNav() {
  const pathname = usePathname();
  const { toggleCart, toggleSearch } = useStore();
  const cartCount = useCartCount();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [costumeOpen, setCostumeOpen] = useState(false);
  const costumeRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (costumeRef.current && !costumeRef.current.contains(e.target as Node)) {
        setCostumeOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop All", href: "/shop" },
    // Costumes handled separately below
    { label: "Sales", href: "/shop?filter=sales" },
    { label: "Watchlist", href: "/wishlist" },
  ];

  const openCostume = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCostumeOpen(true);
  };
  const scheduleCostumeClose = () => {
    closeTimer.current = setTimeout(() => setCostumeOpen(false), 200);
  };
  const cancelCostumeClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <div className="relative z-30 w-full max-w-5xl mx-auto px-4">
      {/* ── Hanging chains ──────────────────────────────────── */}
      <div className="flex justify-between px-14 sm:px-20 pointer-events-none -mb-0.5 relative z-10">
        {[0, 1].map((side) => (
          <div key={side} className="flex flex-col items-center">
            <div className="w-2.5 h-4 border-2 rounded-full mb-0.5" style={{ borderColor: "#7a4e2a", background: "#1a0d05" }} />
            <div className="w-2.5 h-4 border-2 rounded-full -mt-1.5" style={{ borderColor: "#7a4e2a", background: "#1a0d05" }} />
            <div className="w-3 h-3 rounded-full -mt-1" style={{ background: "#6b3e1c", border: "1px solid #4a2910" }} />
          </div>
        ))}
      </div>

      {/* ── Wooden Plank Bar ────────────────────────────────── */}
      <nav
        aria-label="Main Navigation"
        className="wooden-plank relative overflow-hidden flex items-center justify-between px-5 sm:px-8 py-3"
        style={{ borderRadius: 14 }}
      >
        {/* Wood corner rivets */}
        {["top-2 left-3", "bottom-2 left-3", "top-2 right-3", "bottom-2 right-3"].map((pos) => (
          <div
            key={pos}
            className={`absolute ${pos} w-2 h-2 rounded-full`}
            style={{ background: "#1a0b04", border: "1px solid #6b3e1c" }}
          />
        ))}

        {/* ── Desktop Nav Links ──────────────────────────────── */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7 relative z-10">
          {navLinks.map((link) => {
            const isShopAll = link.label === "Shop All";
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className="relative group font-bold tracking-wide transition-all duration-200"
                style={{
                  fontFamily: "'Creepster', 'Henny Penny', cursive, sans-serif",
                  fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
                  color: isShopAll || isActive ? "#FF9D2E" : "#D4832A",
                  letterSpacing: "0.04em",
                  filter: isShopAll || isActive ? "drop-shadow(0 0 8px rgba(255,157,46,0.7))" : "none",
                }}
              >
                {link.label}
                {(isShopAll || isActive) && (
                  <span
                    className="block h-[2px] w-full mt-0.5"
                    style={{
                      background: "linear-gradient(90deg, transparent, #FF9D2E, transparent)",
                      boxShadow: "0 0 8px #FF9D2E",
                    }}
                  />
                )}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-200"
                  style={{ background: "#FF9D2E", opacity: 0.7 }}
                />
              </Link>
            );
          })}

          {/* ── Costumes with mega-dropdown ─────────────────── */}
          <div
            ref={costumeRef}
            className="relative"
            onMouseEnter={openCostume}
            onMouseLeave={scheduleCostumeClose}
          >
            <button
              onClick={() => setCostumeOpen((v) => !v)}
              className="flex items-center gap-1.5 font-bold tracking-wide transition-all duration-200"
              style={{
                fontFamily: "'Creepster', cursive, sans-serif",
                fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
                color: costumeOpen ? "#FF9D2E" : "#D4832A",
                letterSpacing: "0.04em",
                filter: costumeOpen ? "drop-shadow(0 0 8px rgba(255,157,46,0.7))" : "none",
              }}
            >
              Costumes
              <ChevronDown
                className="w-4 h-4 transition-transform duration-200"
                style={{ transform: costumeOpen ? "rotate(180deg)" : "rotate(0deg)", color: "#FF9D2E" }}
              />
            </button>

            {/* ── 4-Column Costumes Mega Menu ─────────────────── */}
            <AnimatePresence>
              {costumeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  onMouseEnter={cancelCostumeClose}
                  onMouseLeave={scheduleCostumeClose}
                  className="absolute left-0 top-full pt-3 z-50"
                  style={{ minWidth: 680 }}
                >
                  <div
                    className="rounded-2xl p-5 shadow-2xl"
                    style={{
                      background: "rgba(14,9,22,0.98)",
                      border: "1.5px solid rgba(255,117,24,0.3)",
                      backdropFilter: "blur(20px)",
                      boxShadow: "0 25px 60px rgba(0,0,0,0.9), 0 0 25px rgba(255,117,24,0.15)",
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 pb-3" style={{ borderBottom: "1px solid rgba(255,117,24,0.2)" }}>
                      <span className="font-extrabold text-sm uppercase tracking-widest" style={{ color: "#FF7518" }}>
                        🎃 Shop All Costumes
                      </span>
                      <Link
                        href="/shop?category=costumes"
                        onClick={() => setCostumeOpen(false)}
                        className="flex items-center gap-1 text-xs font-bold hover:opacity-80 transition-opacity"
                        style={{ color: "#FF9D2E" }}
                      >
                        View All <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* 4 columns */}
                    <div className="grid grid-cols-4 gap-4">
                      {COSTUMES_COLUMNS.map((col) => (
                        <div key={col.title}>
                          <p
                            className="text-[10px] font-extrabold uppercase tracking-widest mb-2.5"
                            style={{ color: "#FF7518" }}
                          >
                            {col.title}
                          </p>
                          <ul className="space-y-1.5">
                            {col.items.map((item) => (
                              <li key={item}>
                                <Link
                                  href={`/shop?category=${toSlug(item)}`}
                                  onClick={() => setCostumeOpen(false)}
                                  className="group flex items-center gap-1 text-xs transition-all duration-150"
                                  style={{ color: "rgba(220,200,255,0.75)" }}
                                >
                                  <span className="group-hover:translate-x-1 group-hover:text-[#FF9D2E] transition-all">
                                    {item}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile hamburger ──────────────────────────────── */}
        <div className="md:hidden flex items-center relative z-10">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 transition-colors"
            style={{ color: "#FF9D2E" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <span
            className="ml-2 font-bold"
            style={{ fontFamily: "'Creepster', cursive", fontSize: "1rem", color: "#FF9D2E" }}
          >
            Halloween Haven
          </span>
        </div>

        {/* ── Icons: Cart + Search ──────────────────────────── */}
        <div className="flex items-center gap-4 sm:gap-5 relative z-10">
          <button
            onClick={toggleCart}
            className="relative transition-all duration-200 hover:scale-110"
            style={{ color: "#FF9D2E", filter: "drop-shadow(0 0 8px rgba(255,157,46,0.5))" }}
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1.5 -right-2 text-[11px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg,#e53e3e,#dd6b20)",
                  color: "white",
                  border: "1px solid #FFB347",
                  boxShadow: "0 0 8px rgba(255,100,0,0.8)",
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={toggleSearch}
            className="transition-all duration-200 hover:scale-110"
            style={{ color: "#FF9D2E", filter: "drop-shadow(0 0 8px rgba(255,157,46,0.5))" }}
            aria-label="Search"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.4]" />
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown ──────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden mt-2 rounded-xl p-4 space-y-2 relative z-30"
          style={{
            background: "rgba(14,9,22,0.97)",
            border: "1px solid rgba(255,117,24,0.3)",
          }}
        >
          {[...navLinks, { label: "Costumes", href: "/shop?category=costumes" }].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-bold transition-colors"
              style={{
                fontFamily: "'Creepster', cursive",
                color: "#FF9D2E",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
