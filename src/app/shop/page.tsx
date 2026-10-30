"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Ghost,
} from "lucide-react";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

function ShopContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    const cat = searchParams.get("category");
    return cat ? [cat] : [];
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setSelectedCategories([cat]);
    } else {
      setSelectedCategories([]);
    }
  }, [searchParams]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const clearAll = () => {
    setQuery("");
    setSelectedCategories([]);
    setPriceRange([0, 200]);
    setSelectedSizes([]);
    setSortBy("featured");
  };

  const hasFilters =
    query ||
    selectedCategories.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 200 ||
    selectedSizes.length > 0 ||
    sortBy !== "featured";

  const filterParam = searchParams.get("filter");

  const results = useMemo(() => {
    let list = [...PRODUCTS];

    if (filterParam === "bestsellers") {
      list = list.filter((p) => p.isBestSeller);
    } else if (filterParam === "sale" || filterParam === "sales") {
      list = list.filter((p) => (p.originalPrice && p.originalPrice > p.price) || p.tags.includes("sale"));
    } else if (filterParam === "spooky-decor") {
      list = list.filter((p) => p.tags.includes("spooky-decor"));
    }

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      list = list.filter((p) =>
        selectedCategories.some((cat) => {
          const catNorm = cat.toLowerCase().replace(/[-_&]/g, " ").trim();
          const catRaw = cat.toLowerCase().trim();
          const pCat = p.category.toLowerCase().replace(/[-_&]/g, " ").trim();
          const pName = p.name.toLowerCase();
          const pDesc = p.description.toLowerCase();
          const pTags = p.tags.map((t) => t.toLowerCase().replace(/[-_&]/g, " "));

          // Direct category slug match
          if (p.category.toLowerCase() === catRaw || pCat === catNorm) return true;

          // Keyword or sub-category tag match
          if (pTags.some((t) => t === catNorm || t.includes(catNorm) || catNorm.includes(t))) return true;

          // Item name or description match
          if (pName.includes(catNorm) || catNorm.split(" ").some((w) => w.length > 3 && pName.includes(w))) return true;
          if (pDesc.includes(catNorm)) return true;

          // Fallback theme matches
          if (catRaw.includes("adult") || catRaw.includes("men") || catRaw.includes("women") || catRaw.includes("unisex")) {
            return p.sizes.some((s) => ["S", "M", "L", "XL", "XXL"].includes(s));
          }
          if (catRaw.includes("kid") || catRaw.includes("baby") || catRaw.includes("boy") || catRaw.includes("girl")) {
            return p.category === "kids" || p.tags.includes("kids") || p.sizes.some((s) => s.includes("T") || s.includes("M"));
          }

          return false;
        })
      );
    }

    list = list.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedSizes.length > 0) {
      list = list.filter((p) =>
        selectedSizes.some((s) => p.sizes.includes(s))
      );
    }

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return list;
  }, [query, selectedCategories, priceRange, selectedSizes, sortBy, filterParam]);

  return (
    <div className="min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="section-title text-5xl text-white">
            {filterParam === "spooky-decor" ? (
              <>SPOOKY <span className="gradient-text-pumpkin">DECOR</span></>
            ) : filterParam === "sale" || filterParam === "sales" ? (
              <>FLASH <span className="gradient-text-pumpkin">SALES</span></>
            ) : (
              <>THE <span className="gradient-text-pumpkin">COLLECTION</span></>
            )}
          </h1>
          <p className="text-muted mt-2">
            {filterParam === "spooky-decor"
              ? `${results.length} spooky decor props and lighting found to transform your haunted home.`
              : filterParam === "sale" || filterParam === "sales"
              ? `${results.length} discounted Halloween items on special markdown.`
              : `${results.length} costumes found — each one more haunting than the last.`}
          </p>
        </motion.div>

        {/* Search + Sort bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search costumes, categories..."
              className="w-full bg-surface border border-card-border text-white placeholder-muted pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:border-pumpkin/50 transition-colors"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-surface border border-card-border text-white pl-4 pr-10 py-3 rounded-xl focus:outline-none focus:border-pumpkin/50 cursor-pointer min-w-[200px]"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
              showFilters
                ? "bg-pumpkin text-void border-pumpkin"
                : "border-card-border text-muted hover:text-white hover:border-pumpkin/30"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasFilters && (
              <span className="w-2 h-2 rounded-full bg-slime ml-1" />
            )}
          </button>

          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-3 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-64 shrink-0 space-y-6 self-start sticky top-24"
              >
                {/* Categories */}
                <div className="card-surface p-5">
                  <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-white">
                    Category
                  </h3>
                  <div className="space-y-2">
                    {CATEGORIES.map((cat) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div
                          onClick={() => toggleCategory(cat.slug)}
                          className={`w-4 h-4 rounded border transition-colors cursor-pointer flex items-center justify-center ${
                            selectedCategories.includes(cat.slug)
                              ? "bg-pumpkin border-pumpkin"
                              : "border-card-border group-hover:border-pumpkin/50"
                          }`}
                        >
                          {selectedCategories.includes(cat.slug) && (
                            <svg
                              className="w-2.5 h-2.5 text-void"
                              fill="currentColor"
                              viewBox="0 0 12 12"
                            >
                              <path d="M10 3L5 8.5 2 5.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                            </svg>
                          )}
                        </div>
                        <span
                          onClick={() => toggleCategory(cat.slug)}
                          className={`text-sm flex-1 transition-colors ${
                            selectedCategories.includes(cat.slug)
                              ? "text-pumpkin"
                              : "text-muted group-hover:text-white"
                          }`}
                        >
                          {cat.name}
                        </span>
                        <span className="text-xs text-muted/60">{cat.count}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="card-surface p-5">
                  <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-white">
                    Price Range
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-pumpkin font-bold">${priceRange[0]}</span>
                      <span className="text-pumpkin font-bold">${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={200}
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Sizes */}
                <div className="card-surface p-5">
                  <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-white">
                    Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                          selectedSizes.includes(size)
                            ? "bg-pumpkin text-void border-pumpkin"
                            : "border-card-border text-muted hover:border-pumpkin/50 hover:text-white"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {results.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 gap-6"
              >
                <Ghost className="w-24 h-24 text-muted/20" strokeWidth={1} />
                <h2 className="text-2xl font-bold text-muted">
                  No costumes found
                </h2>
                <p className="text-muted/60 text-center max-w-sm">
                  The spirits haven&apos;t conjured a match for &ldquo;{query}&rdquo;. Try different
                  search terms or clear your filters.
                </p>
                <button onClick={clearAll} className="btn-primary py-3 px-6">
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              <div
                className={`grid gap-4 sm:gap-5 ${
                  filterParam === "spooky-decor"
                    ? showFilters
                      ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                      : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5"
                    : showFilters
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                }`}
              >
                <AnimatePresence mode="popLayout">
                  {results.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={i}
                      compact={filterParam === "spooky-decor"}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-2 border-pumpkin border-t-transparent animate-spin" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
