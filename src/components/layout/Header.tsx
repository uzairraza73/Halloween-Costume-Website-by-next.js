"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Flame,
  Layers,
} from "lucide-react";
import { useStore, useCartCount, useWishlistCount } from "@/store/useStore";
import { MEGA_MENU_DATA } from "@/data/megaMenu";
import { CATEGORIES_WITH_SUBS, HeaderCategory } from "@/data/categoriesData";

// Custom Jack-o'-lantern carved pumpkin icon matching the user screenshot
function JackOLanternIcon({ className = "w-8 h-8 text-pumpkin" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2c-.6 0-1 .4-1 1 0 .2.1.4.2.6C9.4 3.9 8 5.6 7.4 7.6 6.3 7.2 5 7.5 4.1 8.5c-1.4 1.5-1.5 3.8-.5 5.6-.4.8-.6 1.7-.6 2.6 0 3.3 3.6 6.3 9 6.3s9-3 9-6.3c0-.9-.2-1.8-.6-2.6 1-1.8.9-4.1-.5-5.6-.9-1-2.2-1.3-3.3-.9C16 5.6 14.6 3.9 12.8 3.6c.1-.2.2-.4.2-.6 0-.6-.4-1-1-1z" />
      <polygon points="8.5,10 7,12.5 10,12.5" fill="#0B0910" />
      <polygon points="15.5,10 14,12.5 17,12.5" fill="#0B0910" />
      <polygon points="12,13 11,14.5 13,14.5" fill="#0B0910" />
      <path
        d="M7 16c.8 1.8 2.8 3 5 3s4.2-1.2 5-3l-1.2.3-.8-1.3-.9 1.2-1.1-.3-1 1.1-1.1-.9-1 .8-.8-1-.7 1.1z"
        fill="#0B0910"
      />
    </svg>
  );
}

function HeaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const currentFilter = searchParams.get("filter");
  const currentSearch = searchParams.get("q");

  const { toggleCart, toggleSearch, toggleMobileMenu, isMobileMenuOpen, closeMobileMenu } =
    useStore();

  const cartCount = useCartCount();
  const wishlistCount = useWishlistCount();

  // Mega menu states
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [hoveredCategorySlug, setHoveredCategorySlug] = useState<string | null>(null);
  const [megaMenuTab, setMegaMenuTab] = useState<"categories" | "themes">("categories");
  const [activeCategoryState, setActiveCategoryState] = useState<string>("scary");
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>("scary");

  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pillHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openMegaMenu = (tab: "categories" | "themes" = "categories", initialCat?: string) => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    if (pillHoverTimeoutRef.current) clearTimeout(pillHoverTimeoutRef.current);
    setMegaMenuTab(tab);
    if (initialCat) {
      setActiveCategoryState(initialCat);
    }
    setIsMegaMenuOpen(true);
  };

  const scheduleCloseMegaMenu = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
      setHoveredCategorySlug(null);
    }, 220);
  };

  const cancelCloseMegaMenu = () => {
    if (megaMenuTimeoutRef.current) clearTimeout(megaMenuTimeoutRef.current);
    if (pillHoverTimeoutRef.current) clearTimeout(pillHoverTimeoutRef.current);
  };

  // Hover on category pill in sub-bar
  const handlePillHover = (catSlug: string) => {
    if (pillHoverTimeoutRef.current) clearTimeout(pillHoverTimeoutRef.current);
    setHoveredCategorySlug(catSlug);
  };

  const handlePillLeave = () => {
    pillHoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategorySlug(null);
    }, 200);
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        toggleSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSearch]);

  // Active check helper for top links
  const isTopLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && !currentCategory && !currentFilter && !currentSearch;
    }
    if (href === "/shop") {
      return pathname === "/shop" && !currentCategory && !currentFilter;
    }
    if (href === "/shop?filter=bestsellers") {
      return pathname === "/shop" && currentFilter === "bestsellers";
    }
    if (href === "/about") {
      return pathname === "/about";
    }
    return pathname === href;
  };

  // Active check for category pills
  const isCategoryPillActive = (slug: string) => {
    if (pathname === "/shop") {
      return currentCategory === slug;
    }
    return false;
  };

  const activeCategoryData =
    CATEGORIES_WITH_SUBS.find((c) => c.slug === activeCategoryState) || CATEGORIES_WITH_SUBS[0];

  // On home page, reference layout showcases the wooden plank header directly inside the hero
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0B0910]/95 border-b border-card-border/80 shadow-2xl transition-all">

      {/* 1. TOP NAVBAR LAYER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          {/* Brand Logo: HALLOWEEN HAVEN */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative">
              <JackOLanternIcon className="w-8 h-8 text-pumpkin transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(255,117,24,0.6)]" />
              <div className="absolute -inset-1 bg-pumpkin/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span
                className="text-xl sm:text-2xl font-black tracking-wider leading-none text-pumpkin drop-shadow-[0_2px_8px_rgba(255,117,24,0.4)]"
                style={{ fontFamily: "Bebas Neue, Inter, sans-serif", letterSpacing: "0.08em" }}
              >
                HALLOWEEN
              </span>
              <span
                className="text-xs sm:text-sm font-extrabold tracking-widest text-white leading-none mt-0.5"
                style={{ fontFamily: "Bebas Neue, Inter, sans-serif", letterSpacing: "0.14em" }}
              >
                HAVEN
              </span>
            </div>
          </Link>

          {/* Main Nav Links (Center) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors duration-200 ${
                isTopLinkActive("/") ? "text-white font-semibold" : "text-muted hover:text-white"
              }`}
            >
              Home
            </Link>

            <Link
              href="/shop"
              className={`transition-colors duration-200 ${
                isTopLinkActive("/shop") ? "text-white font-semibold" : "text-muted hover:text-white"
              }`}
            >
              Shop All
            </Link>

            {/* Categories Mega Menu Trigger with prominent glow */}
            <div
              className="relative"
              onMouseEnter={() => openMegaMenu("categories")}
              onMouseLeave={scheduleCloseMegaMenu}
            >
              <button
                onClick={() => {
                  if (isMegaMenuOpen) {
                    setIsMegaMenuOpen(false);
                  } else {
                    openMegaMenu("categories");
                  }
                }}
                className={`px-4 py-1.5 rounded-full border transition-all duration-200 flex items-center gap-1.5 text-xs font-semibold ${
                  isMegaMenuOpen
                    ? "border-pumpkin bg-pumpkin/25 text-white shadow-[0_0_18px_rgba(255,117,24,0.6)] scale-105"
                    : "border-pumpkin/70 bg-pumpkin/15 text-white hover:bg-pumpkin/25 hover:border-pumpkin shadow-[0_0_12px_rgba(255,117,24,0.35)]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-pumpkin" />
                <span>Categories</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMegaMenuOpen ? "rotate-180 text-pumpkin" : "text-white"
                  }`}
                />
              </button>
            </div>

            <Link
              href="/shop?filter=bestsellers"
              className={`transition-colors duration-200 ${
                isTopLinkActive("/shop?filter=bestsellers")
                  ? "text-white font-semibold"
                  : "text-muted hover:text-white"
              }`}
            >
              Best Sellers
            </Link>

            <Link
              href="/about"
              className={`transition-colors duration-200 ${
                isTopLinkActive("/about") ? "text-white font-semibold" : "text-muted hover:text-white"
              }`}
            >
              About Us
            </Link>
          </nav>

          {/* Action Utilities (Right) */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={toggleSearch}
              className="p-2 text-white/90 hover:text-pumpkin hover:bg-white/5 rounded-full transition-colors flex items-center gap-1.5"
              aria-label="Search costumes"
              title="Search (Ctrl+K)"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Heart with Purple Badge */}
            <Link
              href="/wishlist"
              className="relative p-2 text-white/90 hover:text-red-400 hover:bg-white/5 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-spectral text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md shadow-spectral/40">
                {wishlistCount}
              </span>
            </Link>

            {/* Shopping Bag Cart with Purple Badge */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-white/90 hover:text-pumpkin hover:bg-white/5 rounded-full transition-colors"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <motion.span
                key={cartCount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-spectral text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-md shadow-spectral/40"
              >
                {cartCount}
              </motion.span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-muted hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6 text-pumpkin" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 2. SUB-CATEGORY QUICK-LINKS BAR WITH INTERACTIVE SUB-MENUS */}
      <div className="hidden lg:block border-t border-card-border/60 bg-[#0E0A17]/90 py-2.5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {/* [ Home ] Pill */}
            <Link
              href="/"
              onClick={() => {
                setIsMegaMenuOpen(false);
                setHoveredCategorySlug(null);
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border shrink-0 ${
                isTopLinkActive("/")
                  ? "border-pumpkin bg-pumpkin/20 text-pumpkin shadow-[0_0_12px_rgba(255,117,24,0.45)] font-bold scale-[1.02]"
                  : "border-white/10 bg-[#161022] text-white/90 hover:border-pumpkin/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>[ Home ]</span>
            </Link>

            {/* Shop All Dropdown Trigger */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => openMegaMenu("themes")}
              onMouseLeave={scheduleCloseMegaMenu}
            >
              <button
                onClick={() => {
                  if (isMegaMenuOpen && megaMenuTab === "themes") {
                    setIsMegaMenuOpen(false);
                  } else {
                    openMegaMenu("themes");
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  isMegaMenuOpen && megaMenuTab === "themes"
                    ? "border-pumpkin bg-pumpkin/20 text-pumpkin shadow-[0_0_12px_rgba(255,117,24,0.4)]"
                    : "border-white/10 bg-[#161022] text-white/90 hover:border-pumpkin/50 hover:text-white"
                }`}
              >
                <span>Shop</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isMegaMenuOpen && megaMenuTab === "themes" ? "rotate-180 text-pumpkin" : "text-muted"
                  }`}
                />
              </button>
            </div>

            {/* Dynamic Category Pills with Sub-Category Dropdown Menus */}
            {CATEGORIES_WITH_SUBS.map((cat) => {
              const isActive = isCategoryPillActive(cat.slug);
              const isPillHovered = hoveredCategorySlug === cat.slug;

              return (
                <div
                  key={cat.id}
                  className="relative shrink-0 group"
                  onMouseEnter={() => handlePillHover(cat.slug)}
                  onMouseLeave={handlePillLeave}
                >
                  <Link
                    href={`/shop?category=${cat.slug}`}
                    onClick={() => {
                      setIsMegaMenuOpen(false);
                      setHoveredCategorySlug(null);
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border shrink-0 ${
                      isActive
                        ? "border-pumpkin bg-pumpkin/20 text-pumpkin shadow-[0_0_14px_rgba(255,117,24,0.45)] font-bold scale-[1.02]"
                        : isPillHovered
                        ? "border-pumpkin/70 bg-[#211736] text-white shadow-[0_0_10px_rgba(255,117,24,0.25)]"
                        : "border-white/10 bg-[#161022] text-white/90 hover:border-pumpkin/50 hover:bg-[#1C142B] hover:text-white"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label.split(" ")[0]}</span>
                    <ChevronDown
                      className={`w-3 h-3 text-white/50 transition-transform duration-150 group-hover:rotate-180 group-hover:text-pumpkin`}
                    />
                  </Link>

                  {/* PROMINENT SUB-CATEGORY HOVER POPUP MENU */}
                  <AnimatePresence>
                    {isPillHovered && !isMegaMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="absolute left-0 top-full pt-2 z-50 min-w-[280px]"
                      >
                        <div className="rounded-2xl bg-[#140D22]/98 backdrop-blur-2xl border border-card-border p-4 shadow-[0_15px_40px_rgba(0,0,0,0.85)] ring-1 ring-pumpkin/20">
                          {/* Submenu Header */}
                          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-card-border/80">
                            <div className="flex items-center gap-2">
                              <span className="text-base">{cat.icon}</span>
                              <span className="text-xs font-bold text-white uppercase tracking-wider">
                                {cat.label}
                              </span>
                            </div>
                            <Link
                              href={`/shop?category=${cat.slug}`}
                              onClick={() => setHoveredCategorySlug(null)}
                              className="text-[11px] font-bold text-pumpkin hover:text-amber-300 flex items-center gap-0.5"
                            >
                              <span>View All</span>
                              <ChevronRight className="w-3 h-3" />
                            </Link>
                          </div>

                          <p className="text-[11px] text-muted mb-3 leading-relaxed">
                            {cat.description}
                          </p>

                          {/* Sub-category links */}
                          <div className="space-y-1">
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-pumpkin/90 block mb-1">
                              Popular Sub-Categories
                            </span>
                            {cat.popularSubCategories.map((sub) => (
                              <Link
                                key={sub.name}
                                href={`/shop?category=${sub.slug}${sub.tag ? `&q=${sub.tag}` : ""}`}
                                onClick={() => setHoveredCategorySlug(null)}
                                className="group/item flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-white/80 hover:text-white hover:bg-pumpkin/15 transition-all duration-150"
                              >
                                <span className="group-hover/item:translate-x-1 transition-transform group-hover/item:text-pumpkin">
                                  {sub.name}
                                </span>
                                {sub.badge ? (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-spectral/30 text-purple-200 border border-purple-500/30">
                                    {sub.badge}
                                  </span>
                                ) : (
                                  <ChevronRight className="w-3 h-3 text-muted/60 group-hover/item:text-pumpkin group-hover/item:translate-x-0.5 transition-all" />
                                )}
                              </Link>
                            ))}
                          </div>

                          {/* Featured Fast Pick */}
                          {cat.featuredCostumes && cat.featuredCostumes.length > 0 && (
                            <div className="mt-3 pt-2.5 border-t border-card-border/80">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted block mb-1.5">
                                Top Pick
                              </span>
                              <Link
                                href={`/product/${cat.featuredCostumes[0].slug}`}
                                onClick={() => setHoveredCategorySlug(null)}
                                className="flex items-center justify-between p-2 rounded-xl bg-surface/70 hover:bg-surface border border-card-border/60 hover:border-pumpkin/50 transition-all text-xs"
                              >
                                <span className="text-white font-medium truncate max-w-[170px]">
                                  {cat.featuredCostumes[0].name}
                                </span>
                                <span className="text-pumpkin font-bold text-xs shrink-0">
                                  {cat.featuredCostumes[0].price}
                                </span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Wishlist Pill */}
            <Link
              href="/wishlist"
              onClick={() => {
                setIsMegaMenuOpen(false);
                setHoveredCategorySlug(null);
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border shrink-0 ${
                pathname === "/wishlist"
                  ? "border-pumpkin bg-pumpkin/20 text-pumpkin shadow-[0_0_12px_rgba(255,117,24,0.45)] font-bold scale-[1.02]"
                  : "border-white/10 bg-[#161022] text-white/90 hover:border-pumpkin/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Heart className="w-3 h-3 text-red-400" />
              <span>Wishlist</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* 3. FULL PROMINENT MEGA MENU MODAL WITH CATEGORIES & SUB-CATEGORIES */}
      <AnimatePresence>
        {isMegaMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onMouseEnter={cancelCloseMegaMenu}
            onMouseLeave={scheduleCloseMegaMenu}
            className="absolute left-0 right-0 top-full z-50 flex justify-center px-4 pt-2 pb-6"
          >
            <div className="w-full max-w-6xl rounded-2xl bg-[#120C1E]/98 backdrop-blur-2xl border border-white/10 shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-6 overflow-hidden ring-1 ring-white/10">
              {/* Header Navigation Tabs inside Mega Menu */}
              <div className="flex flex-col sm:flex-row items-center justify-between pb-4 mb-5 border-b border-card-border/80 gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setMegaMenuTab("categories")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      megaMenuTab === "categories"
                        ? "bg-pumpkin text-void shadow-[0_0_15px_rgba(255,117,24,0.5)]"
                        : "bg-surface text-muted hover:text-white border border-card-border"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Browse By Category & Sub-Category</span>
                  </button>

                  <button
                    onClick={() => setMegaMenuTab("themes")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                      megaMenuTab === "themes"
                        ? "bg-pumpkin text-void shadow-[0_0_15px_rgba(255,117,24,0.5)]"
                        : "bg-surface text-muted hover:text-white border border-card-border"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Character & Theme Directory</span>
                  </button>
                </div>

                {/* Promo link */}
                <Link
                  href="/shop?filter=sale"
                  onClick={() => setIsMegaMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pumpkin hover:text-amber-300 transition-colors tracking-wide group"
                >
                  <Flame className="w-3.5 h-3.5 text-pumpkin animate-pulse" />
                  <span className="underline underline-offset-4 decoration-pumpkin/50">
                    Flash Deals & Special Offers
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* TAB 1: CATEGORIES & THEIR SUB-CATEGORIES (PROMINENT VIEW) */}
              {megaMenuTab === "categories" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Categories List */}
                  <div className="lg:col-span-4 space-y-1.5 border-b lg:border-b-0 lg:border-r border-card-border/70 pb-4 lg:pb-0 lg:pr-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-muted block mb-2 px-2">
                      Select Category
                    </span>
                    {CATEGORIES_WITH_SUBS.map((cat) => {
                      const isSelected = cat.slug === activeCategoryState;
                      return (
                        <button
                          key={cat.id}
                          onMouseEnter={() => setActiveCategoryState(cat.slug)}
                          onClick={() => setActiveCategoryState(cat.slug)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-150 ${
                            isSelected
                              ? "bg-pumpkin/20 border border-pumpkin/80 text-white shadow-[0_0_15px_rgba(255,117,24,0.25)]"
                              : "hover:bg-surface border border-transparent text-white/80 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl p-1.5 rounded-lg bg-[#181126] border border-white/5">
                              {cat.icon}
                            </span>
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                <span>{cat.label}</span>
                              </div>
                              <span className="text-[11px] text-muted line-clamp-1">
                                {cat.description}
                              </span>
                            </div>
                          </div>
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${
                              isSelected ? "text-pumpkin translate-x-1" : "text-muted/60"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                  {/* Right Column: Prominent Sub-Categories & Costumes */}
                  <div className="lg:col-span-8 flex flex-col justify-between">
                    <div>
                      {/* Active category header */}
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-card-border/60">
                        <div className="flex items-center gap-2.5">
                          <span className="text-2xl">{activeCategoryData.icon}</span>
                          <div>
                            <h3 className="text-base font-extrabold text-white">
                              {activeCategoryData.label} Sub-Categories
                            </h3>
                            <p className="text-xs text-muted">
                              {activeCategoryData.description}
                            </p>
                          </div>
                        </div>

                        <Link
                          href={`/shop?category=${activeCategoryData.slug}`}
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="px-3.5 py-1.5 rounded-xl bg-pumpkin/15 hover:bg-pumpkin/25 text-pumpkin border border-pumpkin/40 text-xs font-bold flex items-center gap-1 transition-all"
                        >
                          <span>Explore All {activeCategoryData.label.split(" ")[0]}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>

                      {/* Prominent Sub-category Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                        {activeCategoryData.popularSubCategories.map((sub) => (
                          <Link
                            key={sub.name}
                            href={`/shop?category=${sub.slug}${sub.tag ? `&q=${sub.tag}` : ""}`}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="group flex items-center justify-between p-3 rounded-xl bg-[#181226] border border-card-border/80 hover:border-pumpkin/60 hover:bg-[#201834] transition-all duration-200"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white group-hover:text-pumpkin transition-colors">
                                  {sub.name}
                                </span>
                                {sub.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-spectral/30 text-purple-200 border border-purple-500/30">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-muted block">
                                Explore collection & props
                              </span>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-surface flex items-center justify-center text-muted group-hover:text-pumpkin group-hover:bg-pumpkin/10 transition-all">
                              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Featured items highlight bottom bar */}
                    {activeCategoryData.featuredCostumes && (
                      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-surface to-[#1A122A] border border-card-border/80">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-pumpkin">
                            ⭐ Featured in this Category
                          </span>
                          <span className="text-[11px] text-muted">Ready to Ship</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {activeCategoryData.featuredCostumes.map((feat) => (
                            <Link
                              key={feat.slug}
                              href={`/product/${feat.slug}`}
                              onClick={() => setIsMegaMenuOpen(false)}
                              className="flex items-center justify-between p-2 rounded-xl bg-void/50 hover:bg-void border border-card-border/40 hover:border-pumpkin/40 transition-colors text-xs"
                            >
                              <span className="text-white font-medium truncate max-w-[210px]">
                                {feat.name}
                              </span>
                              <span className="text-pumpkin font-bold text-xs shrink-0">
                                {feat.price}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* TAB 2: CHARACTER & THEME 4-COLUMN DIRECTORY (ORIGINAL RICH DIRECTORY) */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {MEGA_MENU_DATA.map((col) => (
                    <div key={col.title} className="space-y-3">
                      {/* Column Header */}
                      <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider pb-2 border-b border-card-border/60">
                        <span>{col.icon}</span>
                        <span>{col.title}</span>
                      </div>

                      {/* Column Items */}
                      <ul className="space-y-1.5">
                        {col.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              href={`/shop?category=${item.slug}`}
                              onClick={() => setIsMegaMenuOpen(false)}
                              className="group flex items-center justify-between py-1 text-xs text-muted hover:text-white transition-all duration-150"
                            >
                              <span className="group-hover:translate-x-1 group-hover:text-pumpkin transition-all">
                                {item.label}
                              </span>
                              {item.hasArrow && (
                                <ChevronRight className="w-3.5 h-3.5 text-muted/60 group-hover:text-pumpkin group-hover:translate-x-0.5 transition-all" />
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE DRAWER MENU (ENHANCED FOR SUB-CATEGORIES) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden overflow-hidden border-t border-card-border bg-[#0E0A17]/98 backdrop-blur-2xl"
          >
            <div className="p-4 space-y-4 max-h-[85vh] overflow-y-auto">
              {/* Quick Search Input */}
              <button
                onClick={() => {
                  closeMobileMenu();
                  toggleSearch();
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-surface border border-card-border text-muted text-xs"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-pumpkin" />
                  <span>Search all costumes & themes...</span>
                </div>
                <span className="text-[10px] text-pumpkin font-bold">Search</span>
              </button>

              {/* Main Links */}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="p-3 rounded-xl text-center text-xs font-bold bg-surface border border-card-border text-white hover:border-pumpkin/40"
                >
                  🏠 Home
                </Link>
                <Link
                  href="/shop"
                  onClick={closeMobileMenu}
                  className="p-3 rounded-xl text-center text-xs font-bold bg-surface border border-card-border text-white hover:border-pumpkin/40"
                >
                  🛍️ Shop All
                </Link>
              </div>

              {/* Categories & Subcategories Accordion in Mobile */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-2 px-1">
                  Categories & Sub-Categories
                </span>
                <div className="space-y-2">
                  {CATEGORIES_WITH_SUBS.map((cat) => {
                    const isExpanded = mobileExpandedCat === cat.slug;
                    return (
                      <div
                        key={cat.id}
                        className="bg-surface/50 rounded-xl border border-card-border overflow-hidden"
                      >
                        <button
                          onClick={() => setMobileExpandedCat(isExpanded ? null : cat.slug)}
                          className="w-full flex items-center justify-between p-3 text-left hover:bg-surface/80"
                        >
                          <div className="flex items-center gap-2">
                            <span>{cat.icon}</span>
                            <span className="text-xs font-bold text-white">{cat.label}</span>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-muted transition-transform ${
                              isExpanded ? "rotate-180 text-pumpkin" : ""
                            }`}
                          />
                        </button>

                        {isExpanded && (
                          <div className="p-3 pt-0 border-t border-card-border/50 bg-[#161022]">
                            <p className="text-[11px] text-muted py-2">{cat.description}</p>
                            <div className="space-y-1">
                              {cat.popularSubCategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={`/shop?category=${sub.slug}${sub.tag ? `&q=${sub.tag}` : ""}`}
                                  onClick={closeMobileMenu}
                                  className="flex items-center justify-between py-1.5 px-2 rounded-lg text-xs text-white/90 hover:text-pumpkin hover:bg-white/5"
                                >
                                  <span>• {sub.name}</span>
                                  {sub.badge && (
                                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-spectral/30 text-purple-200">
                                      {sub.badge}
                                    </span>
                                  )}
                                </Link>
                              ))}
                              <Link
                                href={`/shop?category=${cat.slug}`}
                                onClick={closeMobileMenu}
                                className="block text-center mt-2 py-1.5 rounded-lg bg-pumpkin/20 text-pumpkin font-bold text-xs"
                              >
                                View All {cat.label} →
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Character & Themes Directory for Mobile */}
              <div className="space-y-3 pt-2 border-t border-card-border">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted block px-1">
                  Popular Franchise Themes
                </span>
                {MEGA_MENU_DATA.slice(0, 2).map((col) => (
                  <div key={col.title} className="bg-surface/50 rounded-xl p-3 border border-card-border">
                    <span className="text-xs font-bold text-pumpkin uppercase tracking-wide block mb-2">
                      {col.icon} {col.title}
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-xs text-muted">
                      {col.items.slice(0, 6).map((item) => (
                        <Link
                          key={item.label}
                          href={`/shop?category=${item.slug}`}
                          onClick={closeMobileMenu}
                          className="hover:text-white truncate py-0.5"
                        >
                          • {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                onClick={closeMobileMenu}
                className="flex items-center justify-between p-3 rounded-xl bg-surface border border-card-border text-white text-xs"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span>Your Wishlist</span>
                </div>
                <span className="text-xs font-bold bg-spectral px-2 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Header() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0B0910]/90 h-16 border-b border-card-border" />
      }
    >
      <HeaderInner />
    </Suspense>
  );
}
