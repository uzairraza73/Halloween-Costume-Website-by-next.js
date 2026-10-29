"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Plus, Minus, Trash2, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useStore, useCartTotal } from "@/store/useStore";

const FREE_SHIPPING_THRESHOLD = 75;

export function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity, clearCart } =
    useStore();
  const total = useCartTotal();
  const shippingProgress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - total, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md z-50 flex flex-col"
            style={{ background: "#15101D", borderLeft: "1px solid #2A1F3D" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-card-border">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-pumpkin" />
                <h2 className="font-bold text-lg">
                  Your Cart{" "}
                  <span className="text-muted text-sm font-normal">
                    ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
                  </span>
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-muted hover:text-white rounded-lg hover:bg-white/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping bar */}
            <div className="px-6 py-3 border-b border-card-border">
              {remaining > 0 ? (
                <p className="text-sm text-muted mb-2">
                  Add{" "}
                  <span className="text-pumpkin font-bold">${remaining.toFixed(2)}</span>{" "}
                  more for free shipping!
                </p>
              ) : (
                <p className="text-sm text-slime font-medium mb-2">
                  🎉 You&apos;ve unlocked FREE shipping!
                </p>
              )}
              <div className="h-1.5 bg-card-border rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full"
                  style={{
                    background:
                      shippingProgress >= 100
                        ? "#B8F34A"
                        : "linear-gradient(90deg, #FF7518, #FFB347)",
                  }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <Package className="w-16 h-16 text-muted/30" />
                  <p className="text-muted font-medium">Your cart is empty</p>
                  <p className="text-muted/60 text-sm">
                    Explore our haunted collection!
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="btn-primary py-3 px-6 text-sm"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                cartItems.map((item, i) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-4 p-3 rounded-xl bg-void border border-card-border"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {item.product.name}
                      </p>
                      <p className="text-muted text-xs mt-0.5">Size: {item.size}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.quantity - 1)
                            }
                            className="w-6 h-6 rounded-full bg-card-border hover:bg-pumpkin/20 flex items-center justify-center transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.size, item.quantity + 1)
                            }
                            className="w-6 h-6 rounded-full bg-card-border hover:bg-pumpkin/20 flex items-center justify-center transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-pumpkin font-bold text-sm">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.size)}
                      className="text-muted hover:text-red-400 transition-colors p-1 self-start"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-card-border space-y-3">
                <div className="flex justify-between text-sm text-muted">
                  <span>Subtotal</span>
                  <span className="text-white">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted">
                  <span>Shipping</span>
                  <span className={total >= FREE_SHIPPING_THRESHOLD ? "text-slime" : "text-white"}>
                    {total >= FREE_SHIPPING_THRESHOLD ? "FREE" : "$9.99"}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-card-border pt-3">
                  <span>Total</span>
                  <span className="text-pumpkin">
                    ${(total + (total >= FREE_SHIPPING_THRESHOLD ? 0 : 9.99)).toFixed(2)}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full text-center block py-3"
                >
                  Checkout Now
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-muted text-sm hover:text-red-400 transition-colors py-1"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
