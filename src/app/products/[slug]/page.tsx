"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  ChevronLeft,
  Shield,
  Truck,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/products/ProductCard";

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const { addToCart, addToWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 3000);
      return;
    }
    addToCart(product, selectedSize, quantity);
  };

  return (
    <div className="min-h-screen pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/" className="hover:text-pumpkin transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-pumpkin transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-white">{product.name}</span>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-muted hover:text-white text-sm mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        {/* Product Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0.7, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-[4/5] rounded-2xl overflow-hidden glow-pumpkin"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {product.badge && (
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-extrabold uppercase ${
                    product.badgeColor === "slime"
                      ? "bg-slime text-void"
                      : product.badgeColor === "spectral"
                      ? "bg-spectral text-white"
                      : "bg-pumpkin text-void"
                  }`}
                >
                  {product.badge}
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                      selectedImage === i
                        ? "ring-2 ring-pumpkin ring-offset-2 ring-offset-void"
                        : "opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted text-sm uppercase tracking-widest mb-2 capitalize">
              {product.category.replace("-", " & ")} — SKU: {product.sku}
            </p>
            <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "text-pumpkin fill-pumpkin"
                        : "text-card-border"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white font-bold">{product.rating}</span>
              <span className="text-muted text-sm">
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-extrabold text-pumpkin">
                ${product.price}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-muted text-xl line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="bg-red-600 text-white text-sm font-bold px-2 py-0.5 rounded-full">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-muted leading-relaxed mb-6">{product.longDescription}</p>

            {/* Features */}
            <ul className="space-y-2 mb-8">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-pumpkin shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Size Picker */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="font-bold text-sm uppercase tracking-wide">
                  Select Size
                </p>
                {!selectedSize && (
                  <span className="text-muted text-xs">Required</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-pumpkin text-void border-pumpkin"
                        : "border-card-border text-muted hover:border-pumpkin/50 hover:text-white"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <AnimatePresence>
                {sizeError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 mt-3 text-red-400 text-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Please select a size before adding to cart.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <p className="font-bold text-sm uppercase tracking-wide">
                Quantity
              </p>
              <div className="flex items-center gap-3 bg-surface border border-card-border rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <span className="text-muted text-sm">
                {product.stock} in stock
              </span>
            </div>

            {/* CTAs */}
            <div className="flex gap-3 mb-8">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="flex-1 btn-primary flex items-center justify-center gap-2 py-4"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => addToWishlist(product)}
                className={`w-14 h-14 rounded-full border flex items-center justify-center transition-colors ${
                  inWishlist
                    ? "bg-red-500/20 border-red-500/50 text-red-400"
                    : "border-card-border text-muted hover:border-red-500/50 hover:text-red-400"
                }`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={inWishlist ? "currentColor" : "none"}
                />
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { Icon: Truck, label: "Free Shipping", sub: "Orders over $75" },
                { Icon: RotateCcw, label: "Easy Returns", sub: "30-day window" },
                { Icon: Shield, label: "Secure Payment", sub: "256-bit SSL" },
              ].map(({ Icon, label, sub }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center p-3 rounded-xl border border-card-border"
                >
                  <Icon className="w-5 h-5 text-pumpkin mb-2" />
                  <p className="text-white text-xs font-bold">{label}</p>
                  <p className="text-muted text-xs">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="section-title text-3xl text-white mb-8">
              You Might Also <span className="gradient-text-pumpkin">Like</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
