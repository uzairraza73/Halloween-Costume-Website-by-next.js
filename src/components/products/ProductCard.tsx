"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Product } from "@/data/products";
import { useStore } from "@/store/useStore";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
  compact?: boolean;
}

const BADGE_COLORS: Record<string, string> = {
  pumpkin: "bg-pumpkin text-void",
  spectral: "bg-spectral text-white",
  slime: "bg-slime text-void",
};

export function ProductCard({ product, index = 0, compact = false }: ProductCardProps) {
  const { addToCart, addToWishlist, isInWishlist } = useStore();
  const [imgError, setImgError] = useState(false);
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, product.sizes[0]);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    addToWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.35 }}
      className="group relative"
    >
      <Link
        href={`/products/${product.slug}`}
        className={`block card-surface card-hover overflow-hidden rounded-2xl border transition-all duration-300 ${
          compact
            ? "border-pumpkin/20 hover:border-pumpkin/60 hover:shadow-[0_0_20px_rgba(255,117,24,0.25)]"
            : "border-card-border hover:border-pumpkin/40"
        }`}
      >
        {/* Image */}
        <div className={`relative overflow-hidden bg-void/50 ${compact ? "aspect-square" : "aspect-[4/5]"}`}>
          <Image
            src={imgError ? "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=600&q=80" : product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge */}
          {product.badge && (
            <div
              className={`absolute ${compact ? "top-2 left-2 px-1.5 py-0.5 text-[10px]" : "top-3 left-3 px-2 py-0.5 text-xs"} rounded-full font-extrabold uppercase tracking-wide shadow-md ${
                BADGE_COLORS[product.badgeColor || "pumpkin"]
              }`}
            >
              {product.badge}
            </div>
          )}

          {/* Discount */}
          {discount && (
            <div className={`absolute ${compact ? "top-2 right-2 text-[10px] px-1.5 py-0.5" : "top-3 right-3 text-xs px-2 py-0.5"} bg-red-600 text-white font-bold rounded-full shadow-md`}>
              -{discount}%
            </div>
          )}

          {/* Stock warning */}
          {product.stock <= 10 && (
            <div className={`absolute ${compact ? "bottom-2 left-2 text-[10px] px-1.5 py-0.5" : "bottom-3 left-3 text-xs px-2 py-1"} bg-black/80 backdrop-blur-sm text-pumpkin rounded-full`}>
              {product.stock} left
            </div>
          )}

          {/* Quick wishlist button */}
          <div className={`absolute ${compact ? "bottom-2 right-2" : "bottom-3 right-3"} flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0`}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className={`${compact ? "w-7 h-7" : "w-9 h-9"} rounded-full glass flex items-center justify-center transition-colors ${
                inWishlist ? "text-red-400" : "text-muted hover:text-red-400"
              }`}
            >
              <Heart
                className={compact ? "w-3.5 h-3.5" : "w-4 h-4"}
                fill={inWishlist ? "currentColor" : "none"}
              />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className={compact ? "p-3" : "p-4"}>
          <p className="text-muted text-[10px] uppercase tracking-widest mb-0.5 capitalize truncate">
            {product.category.replace("-", " & ")}
          </p>
          <h3 className={`font-bold leading-snug group-hover:text-pumpkin transition-colors line-clamp-2 ${compact ? "text-xs min-h-[2rem] mb-1.5" : "text-sm mb-2"}`}>
            {product.name}
          </h3>

          {/* Rating */}
          <div className={`flex items-center gap-1 ${compact ? "mb-2" : "mb-3"}`}>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`${compact ? "w-2.5 h-2.5" : "w-3 h-3"} ${
                    i < Math.floor(product.rating)
                      ? "text-pumpkin fill-pumpkin"
                      : "text-card-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted text-[10px]">({product.reviewCount})</span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className={`text-pumpkin font-extrabold ${compact ? "text-base" : "text-lg"}`}>
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className={`text-muted line-through ${compact ? "text-xs" : "text-sm"}`}>
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickAdd}
              className={`${compact ? "w-7 h-7" : "w-9 h-9"} rounded-full bg-pumpkin text-void flex items-center justify-center hover:bg-pumpkin/90 shadow-sm transition-colors shrink-0`}
              title="Add to Cart"
            >
              <ShoppingCart className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
