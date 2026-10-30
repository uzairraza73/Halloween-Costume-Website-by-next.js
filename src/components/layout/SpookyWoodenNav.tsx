"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search, Menu, X, ChevronDown } from "lucide-react";
import { useStore, useCartCount } from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";

// Sub-categories exactly as shown in the user's reference image
export const CATEGORY_COLUMNS = [
  {
    title: "Shop All Costume Characters",
    items: [
      "Addams Family",
      "American Girl",
      "Barbie",
      "Beetlejuice",
      "Disney",
      "Flintstones",
      "Ghostbusters",
      "Harry Potter",
      "Jurassic World",
      "House of the Dragon",
      "K-Pop Demon Hunters",
      "Looney Tunes",
      "Peanuts",
      "Scooby-Doo",
      "SpongeBob",
      "Teenage Mutant Ninja Turtles",
    ],
  },
  {
    title: "Shop All Costume Themes",
    items: [
      "Couple, Group & Costume Sets",
      "Classics",
      "Career & Occupation",
      "Candy Brands",
      "Horror & Freight",
      "Inflatable",
      "Funny",
      "Superheros",
      "Wheelchair & Wagon Covers",
    ],
  },
  {
    title: "Shop All Adult Costumes",
    items: [
      "Women's Costumes",
      "Men's Costumes",
      "Unisex Costumes",
      "Plus Size Costumes",
      "Couple & Group Costumes",
      "Sexy Costumes",
    ],
  },
  {
    title: "Shop All Kids' Costumes",
    items: [
      "Baby & Infant Costumes",
      "Boys' Costumes",
      "Girls' Costumes",
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
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openCategories = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCategoriesOpen(true);
  };
  const scheduleCategoriesClose = () => {
    closeTimer.current = setTimeout(() => setCategoriesOpen(false), 220);
  };
  const cancelCategoriesClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  // Nav items matching user image order: HOME, SHOP ALL, SALES, WATCHLIST, CATEGORIES v
  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "SHOP ALL", href: "/shop" },
    { label: "SALES", href: "/shop?filter=sales" },
    { label: "WATCHLIST", href: "/wishlist" },
  ];

  return (
    <div className="relative z-50 w-full max-w-6xl mx-auto px-4">
      {/* ── Hanging chains ──────────────────────────────────── */}
      <div className="flex justify-between px-10 sm:px-20 pointer-events-none -mb-0.5 relative z-10">
        {[0, 1].map((side) => (
          <div key={side} className="flex flex-col items-center">
            <div
              className="w-2.5 h-4 border-2 rounded-full mb-0.5"
              style={{ borderColor: "#7a4e2a", background: "#1a0d05" }}
            />
            <div
              className="w-2.5 h-4 border-2 rounded-full -mt-1.5"
              style={{ borderColor: "#7a4e2a", background: "#1a0d05" }}
            />
            <div
              className="w-3 h-3 rounded-full -mt-1"
              style={{ background: "#6b3e1c", border: "1px solid #4a2910" }}
            />
          </div>
        ))}
      </div>

      {/* ── Wooden Plank Bar ────────────────────────────────── */}
      <nav
        aria-label="Main Navigation"
        className="wooden-plank relative overflow-visible flex items-center justify-between px-6 sm:px-10 py-3"
        style={{ borderRadius: 16 }}
      >
        {/* Wood corner rivets */}
        {["top-2.5 left-3", "bottom-2.5 left-3", "top-2.5 right-3", "bottom-2.5 right-3"].map(
          (pos) => (
            <div
              key={pos}
              className={`absolute ${pos} w-2.5 h-2.5 rounded-full`}
              style={{
                background: "#1a0b04",
                border: "1px solid #8B5A2B",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.8)",
              }}
            />
          )
        )}

        {/* ── Desktop Nav Links (HOME, CATEGORIES v, SHOP ALL, SALES, WATCHLIST) ──────────────── */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 relative z-10">
          {/* HOME button */}
          {(() => {
            const isHomeActive = pathname === "/";
            return (
              <Link
                key="HOME"
                href="/"
                className="relative group font-bold tracking-wider transition-all duration-200"
                style={{
                  fontFamily: "'Creepster', 'Henny Penny', cursive, sans-serif",
                  fontSize: "clamp(1rem, 1.7vw, 1.25rem)",
                  color: isHomeActive ? "#FF9D2E" : "#D4832A",
                  letterSpacing: "0.06em",
                  filter: isHomeActive
                    ? "drop-shadow(0 0 10px rgba(255,157,46,0.85))"
                    : "drop-shadow(0 1px 2px rgba(0,0,0,0.9))",
                }}
              >
                HOME
                {isHomeActive && (
                  <span
                    className="block h-[2.5px] w-full mt-0.5 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, transparent, #FF9D2E, transparent)",
                      boxShadow: "0 0 10px #FF9D2E",
                    }}
                  />
                )}
                <span
                  className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-200"
                  style={{ background: "#FF9D2E", opacity: 0.8 }}
                />
              </Link>
            );
          })()}

          {/* ── CATEGORIES Button (Right after HOME) with Mega Dropdown ─────────────────── */}
          <div
            ref={categoriesRef}
            className="relative"
            onMouseEnter={openCategories}
            onMouseLeave={scheduleCategoriesClose}
          >
            <button
              onClick={() => setCategoriesOpen((v) => !v)}
              className="flex items-center gap-1.5 font-bold tracking-wider transition-all duration-200 focus:outline-none"
              style={{
                fontFamily: "'Creepster', 'Henny Penny', cursive, sans-serif",
                fontSize: "clamp(1rem, 1.7vw, 1.25rem)",
                color: categoriesOpen ? "#FF9D2E" : "#D4832A",
                letterSpacing: "0.06em",
                filter: categoriesOpen
                  ? "drop-shadow(0 0 10px rgba(255,157,46,0.85))"
                  : "drop-shadow(0 1px 2px rgba(0,0,0,0.9))",
              }}
            >
              <span>CATEGORIES</span>
              <ChevronDown
                className="w-4 h-4 transition-transform duration-200"
                style={{
                  transform: categoriesOpen ? "rotate(180deg)" : "rotate(0deg)",
                  color: "#FF9D2E",
                }}
              />
            </button>

            {/* ── Theme-Accredited Spooky Mega Dropdown anchored directly below CATEGORIES button ── */}
            <AnimatePresence>
              {categoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ type: "spring", damping: 25, stiffness: 320 }}
                  onMouseEnter={cancelCategoriesClose}
                  onMouseLeave={scheduleCategoriesClose}
                  className="absolute left-0 top-full pt-3 z-50 w-[min(92vw,1060px)] pointer-events-auto"
                >
                  <div
                    className="relative rounded-2xl p-6 sm:p-7 backdrop-blur-2xl overflow-y-auto max-h-[78vh] w-full"
                    style={{
                      background: "linear-gradient(175deg, #1b1023 0%, #110918 50%, #09050d 100%)",
                      border: "1.5px solid rgba(255, 117, 24, 0.55)",
                      boxShadow: "0 25px 60px rgba(0,0,0,0.95), 0 0 40px rgba(255,117,24,0.2), inset 0 1px 2px rgba(255,190,100,0.25)",
                    }}
                  >
                    {/* Atmospheric spooky background details */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-pumpkin/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-2 left-3 text-xs opacity-50 select-none text-pumpkin animate-pulse">🕷️</div>
                    <div className="absolute top-2 right-4 text-xs opacity-50 select-none text-pumpkin">🕸️</div>

                    {/* Columns grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 relative z-10">
                      {CATEGORY_COLUMNS.map((col, colIdx) => (
                        <motion.div
                          key={col.title}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: colIdx * 0.05, duration: 0.25 }}
                          className="flex flex-col bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.04]"
                        >
                          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-pumpkin/25">
                            <span className="w-2 h-2 rounded-full bg-pumpkin shadow-[0_0_10px_#FF7518]" />
                            <h3
                              className="font-bold text-xs sm:text-sm tracking-wide uppercase text-pumpkin"
                              style={{
                                color: "#FFA43B",
                                textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                                letterSpacing: "0.05em",
                              }}
                            >
                              {col.title}
                            </h3>
                          </div>
                          <ul className="space-y-1">
                            {col.items.map((item) => (
                              <li key={item}>
                                <Link
                                  href={`/shop?category=${toSlug(item)}`}
                                  onClick={() => setCategoriesOpen(false)}
                                  className="group relative flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs sm:text-[13px] text-gray-300 hover:text-white transition-all duration-200 hover:bg-pumpkin/15 hover:border-pumpkin/30 border border-transparent"
                                >
                                  <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-200">
                                    <span className="text-pumpkin/40 group-hover:text-pumpkin transition-colors text-[10px]">
                                      ◈
                                    </span>
                                    <span className="font-medium group-hover:text-pumpkin transition-colors">
                                      {item}
                                    </span>
                                  </span>
                                  <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 text-pumpkin text-xs transition-all duration-200">
                                    →
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ))}
                    </div>

                    {/* Bottom bar inside dropdown */}
                    <div className="mt-5 pt-3.5 border-t border-pumpkin/20 flex flex-wrap items-center justify-between gap-3 text-xs relative z-10">
                      <span className="text-gray-400 flex items-center gap-1.5">
                        <span className="animate-bounce">🎃</span>
                        Explore all <span className="text-pumpkin font-semibold">1,000+</span> spooky costumes, masks & props!
                      </span>
                      <Link
                        href="/shop"
                        onClick={() => setCategoriesOpen(false)}
                        className="inline-flex items-center gap-2 font-bold text-pumpkin hover:text-white transition-all duration-200 bg-pumpkin/15 hover:bg-pumpkin/30 px-3.5 py-1.5 rounded-xl border border-pumpkin/40 shadow-sm hover:shadow-[0_0_15px_rgba(255,117,24,0.4)]"
                      >
                        <span>View All Shop Costumes</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Remaining links (SHOP ALL, SALES, WATCHLIST) */}
          {navLinks
            .filter((link) => link.label !== "HOME")
            .map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative group font-bold tracking-wider transition-all duration-200"
                  style={{
                    fontFamily: "'Creepster', 'Henny Penny', cursive, sans-serif",
                    fontSize: "clamp(1rem, 1.7vw, 1.25rem)",
                    color: isActive ? "#FF9D2E" : "#D4832A",
                    letterSpacing: "0.06em",
                    filter: isActive
                      ? "drop-shadow(0 0 10px rgba(255,157,46,0.85))"
                      : "drop-shadow(0 1px 2px rgba(0,0,0,0.9))",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="block h-[2.5px] w-full mt-0.5 rounded-full"
                      style={{
                        background: "linear-gradient(90deg, transparent, #FF9D2E, transparent)",
                        boxShadow: "0 0 10px #FF9D2E",
                      }}
                    />
                  )}
                  <span
                    className="absolute -bottom-1 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-200"
                    style={{ background: "#FF9D2E", opacity: 0.8 }}
                  />
                </Link>
              );
            })}
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
            style={{ fontFamily: "'Creepster', cursive", fontSize: "1.1rem", color: "#FF9D2E" }}
          >
            HALLOWEEN
          </span>
        </div>

        {/* ── Icons: Cart + Search (Right side) ──────────────── */}
        <div className="flex items-center gap-5 sm:gap-6 relative z-10">
          <button
            onClick={toggleCart}
            className="relative transition-all duration-200 hover:scale-110"
            style={{
              color: "#FF9D2E",
              filter: "drop-shadow(0 0 8px rgba(255,157,46,0.6))",
            }}
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
            style={{
              color: "#FF9D2E",
              filter: "drop-shadow(0 0 8px rgba(255,157,46,0.6))",
            }}
            aria-label="Search"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.4]" />
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown ──────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden mt-2 rounded-xl p-4 space-y-2 relative z-50 shadow-2xl"
          style={{
            background: "rgba(14,9,22,0.98)",
            border: "1px solid rgba(255,117,24,0.3)",
          }}
        >
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-bold transition-colors"
            style={{
              fontFamily: "'Creepster', cursive",
              color: "#FF9D2E",
            }}
          >
            HOME
          </Link>
          <div className="py-1 border-y border-white/10">
            <p className="text-xs uppercase tracking-wider text-pumpkin font-bold px-3 py-1">
              🎃 CATEGORIES:
            </p>
            <div className="max-h-60 overflow-y-auto space-y-1 px-3">
              {CATEGORY_COLUMNS.flatMap((c) => c.items).map((item) => (
                <Link
                  key={item}
                  href={`/shop?category=${toSlug(item)}`}
                  onClick={() => setMobileOpen(false)}
                  className="block text-xs py-1 text-gray-300 hover:text-pumpkin transition-colors"
                >
                  ▸ {item}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="block text-xs font-bold text-pumpkin pt-2 hover:underline"
              >
                View All Categories →
              </Link>
            </div>
          </div>
          {navLinks
            .filter((l) => l.label !== "HOME")
            .map((link) => (
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
