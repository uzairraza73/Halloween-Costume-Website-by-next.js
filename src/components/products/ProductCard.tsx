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
}

const BADGE_COLORS: Record<string, string> = {
  pumpkin: "bg-pumpkin text-void",
  spectral: "bg-spectral text-white",
  slime: "bg-slime text-void",
};

export function ProductCard({ product, index = 0 }: ProductCardProps) {
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
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative"
    >
      <Link href={`/products/${product.slug}`} className="block card-surface card-hover">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={imgError ? "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=600&q=80" : product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge */}
          {product.badge && (
            <div
              className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wide ${
                BADGE_COLORS[product.badgeColor || "pumpkin"]
              }`}
            >
              {product.badge}
            </div>
          )}

          {/* Discount */}
          {discount && (
            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              -{discount}%
            </div>
          )}

          {/* Stock warning */}
          {product.stock <= 10 && (
            <div className="absolute bottom-3 left-3 bg-black/70 text-pumpkin text-xs px-2 py-1 rounded-full">
              Only {product.stock} left!
            </div>
          )}

          {/* Quick actions */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className={`w-9 h-9 rounded-full glass flex items-center justify-center transition-colors ${
                inWishlist ? "text-red-400" : "text-muted hover:text-red-400"
              }`}
            >
              <Heart
                className="w-4 h-4"
                fill={inWishlist ? "currentColor" : "none"}
              />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-muted text-xs uppercase tracking-widest mb-1 capitalize">
            {product.category.replace("-", " & ")}
          </p>
          <h3 className="font-bold text-sm leading-tight mb-2 group-hover:text-pumpkin transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "text-pumpkin fill-pumpkin"
                      : "text-card-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-muted text-xs">({product.reviewCount})</span>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-pumpkin font-extrabold text-lg">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-muted text-sm line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickAdd}
              className="w-9 h-9 rounded-full bg-pumpkin text-void flex items-center justify-center hover:bg-pumpkin/90 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
