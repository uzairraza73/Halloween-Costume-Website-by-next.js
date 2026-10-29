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

        {/* ── Desktop Nav Links (HOME, SHOP ALL, SALES, WATCHLIST, CATEGORIES v) ──────────────── */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 relative z-10">
          {navLinks.map((link) => {
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

          {/* ── CATEGORIES with Mega Dropdown ─────────────────── */}
          <div
            ref={categoriesRef}
            className="relative"
            onMouseEnter={openCategories}
            onMouseLeave={scheduleCategoriesClose}
          >
            <button
              onClick={() => setCategoriesOpen((v) => !v)}
              className="flex items-center gap-1.5 font-bold tracking-wider transition-all duration-200"
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

            {/* ── 4-Column Clean White Dropdown matching User Image ── */}
            <AnimatePresence>
              {categoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  onMouseEnter={cancelCategoriesClose}
                  onMouseLeave={scheduleCategoriesClose}
                  className="fixed left-1/2 -translate-x-1/2 top-20 sm:top-24 z-50 w-[95vw] max-w-6xl"
                >
                  <div
                    className="bg-white text-gray-900 rounded-xl p-8 sm:p-10 shadow-2xl border border-gray-200"
                    style={{
                      boxShadow: "0 25px 60px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)",
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                      {CATEGORY_COLUMNS.map((col) => (
                        <div key={col.title} className="flex flex-col">
                          <h3 className="font-bold text-sm sm:text-base text-gray-950 mb-3 tracking-tight">
                            {col.title}
                          </h3>
                          <ul className="space-y-2">
                            {col.items.map((item) => (
                              <li key={item}>
                                <Link
                                  href={`/shop?category=${toSlug(item)}`}
                                  onClick={() => setCategoriesOpen(false)}
                                  className="text-xs sm:text-[13px] text-gray-700 hover:text-pumpkin hover:underline transition-colors block leading-relaxed"
                                >
                                  {item}
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
          {navLinks.map((link) => (
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
          <div className="pt-2 border-t border-white/10">
            <p className="text-xs uppercase tracking-wider text-pumpkin font-bold px-3 py-1">
              Categories:
            </p>
            <div className="max-h-60 overflow-y-auto space-y-1 px-3">
              {CATEGORY_COLUMNS.flatMap((c) => c.items).slice(0, 12).map((item) => (
                <Link
                  key={item}
                  href={`/shop?category=${toSlug(item)}`}
                  onClick={() => setMobileOpen(false)}
                  className="block text-xs py-1 text-gray-300 hover:text-pumpkin"
                >
                  • {item}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="block text-xs font-bold text-pumpkin pt-2"
              >
                View All Categories →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
