"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, Ghost } from "lucide-react";
import { useStore } from "@/store/useStore";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, moveToCart } = useStore();

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <Ghost className="w-24 h-24 text-muted/20" strokeWidth={1} />
        <h1 className="text-3xl font-extrabold text-white">
          Your Wishlist is Empty
        </h1>
        <p className="text-muted text-center max-w-sm">
          No haunted items saved yet. Browse our collection and heart the ones
          that speak to your dark soul.
        </p>
        <Link href="/shop" className="btn-primary py-3 px-8">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="section-title text-5xl text-white flex items-center gap-4">
            <Heart className="w-10 h-10 text-red-400 fill-red-400" />
            YOUR <span className="gradient-text-spectral">WISHLIST</span>
          </h1>
          <p className="text-muted mt-2">
            {wishlistItems.length} saved{" "}
            {wishlistItems.length === 1 ? "costume" : "costumes"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {wishlistItems.map((item, i) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.06 }}
              className="card-surface group"
            >
              <Link
                href={`/products/${item.product.slug}`}
                className="block relative aspect-[4/5] overflow-hidden"
              >
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent" />
              </Link>

              <div className="p-4">
                <p className="text-muted text-xs uppercase tracking-widest mb-1 capitalize">
                  {item.product.category.replace("-", " & ")}
                </p>
                <h3 className="font-bold mb-3 group-hover:text-pumpkin transition-colors">
                  {item.product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-pumpkin font-extrabold text-lg">
                    ${item.product.price}
                  </span>
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => moveToCart(item.product)}
                      className="flex items-center gap-1.5 bg-pumpkin text-void text-xs font-bold px-3 py-2 rounded-lg hover:bg-pumpkin/90 transition-colors"
                    >
                      <ShoppingCart className="w-3 h-3" />
                      Add to Cart
                    </motion.button>
                    <button
                      onClick={() => removeFromWishlist(item.product.id)}
                      className="w-8 h-8 rounded-lg border border-card-border text-muted hover:text-red-400 hover:border-red-500/30 flex items-center justify-center transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
