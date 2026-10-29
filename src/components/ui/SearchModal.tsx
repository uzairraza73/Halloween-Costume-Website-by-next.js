"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { PRODUCTS } from "@/data/products";

export function SearchModal() {
  const { isSearchOpen, closeSearch } = useStore();
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 6)
    : [];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
          >
            <div className="glass-dark rounded-2xl overflow-hidden border border-pumpkin/20">
              <div className="flex items-center gap-3 p-4 border-b border-card-border">
                <Search className="w-5 h-5 text-pumpkin shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search costumes, categories, props..."
                  className="flex-1 bg-transparent text-white placeholder-muted outline-none text-lg"
                />
                <button onClick={closeSearch} className="text-muted hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {query && (
                <div className="p-2 max-h-96 overflow-y-auto">
                  {results.length === 0 ? (
                    <p className="text-muted text-center py-8">
                      No results for &ldquo;{query}&rdquo;
                    </p>
                  ) : (
                    results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm group-hover:text-pumpkin transition-colors">
                            {product.name}
                          </p>
                          <p className="text-muted text-xs capitalize">{product.category}</p>
                        </div>
                        <span className="text-pumpkin font-bold text-sm">
                          ${product.price}
                        </span>
                      </Link>
                    ))
                  )}
                </div>
              )}

              {!query && (
                <div className="p-4">
                  <p className="text-muted text-xs uppercase tracking-widest mb-3">
                    Popular searches
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Vampire", "Witch", "Skeleton", "Reaper", "Kids", "Couples"].map(
                      (tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-3 py-1.5 text-sm bg-card-border rounded-full text-muted hover:text-pumpkin hover:border-pumpkin/30 border border-transparent transition-colors"
                        >
                          {tag}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
