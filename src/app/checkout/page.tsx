"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  CreditCard,
  Truck,
  CheckCircle,
  Lock,
  Package,
} from "lucide-react";
import { useStore, useCartTotal } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";

const STEPS = ["Shipping", "Payment", "Confirmation"];

interface ShippingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface PaymentData {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

const emptyShipping: ShippingData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "US",
};

const emptyPayment: PaymentData = {
  cardNumber: "",
  cardName: "",
  expiry: "",
  cvv: "",
};

export default function CheckoutPage() {
  const { cartItems, clearCart } = useStore();
  const total = useCartTotal();
  const [step, setStep] = useState(0);
  const [shipping, setShipping] = useState<ShippingData>(emptyShipping);
  const [payment, setPayment] = useState<PaymentData>(emptyPayment);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId] = useState(
    `HT-${Math.random().toString(36).toUpperCase().slice(2, 8)}`
  );

  const shipping_fee = total >= 75 ? 0 : 9.99;
  const tax = total * 0.08;
  const orderTotal = total + shipping_fee + tax;

  const validateShipping = () => {
    const e: Record<string, string> = {};
    if (!shipping.firstName) e.firstName = "Required";
    if (!shipping.lastName) e.lastName = "Required";
    if (!shipping.email || !shipping.email.includes("@")) e.email = "Valid email required";
    if (!shipping.address) e.address = "Required";
    if (!shipping.city) e.city = "Required";
    if (!shipping.zip) e.zip = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePayment = () => {
    const e: Record<string, string> = {};
    if (!payment.cardNumber || payment.cardNumber.replace(/\s/g, "").length < 16)
      e.cardNumber = "Valid card number required";
    if (!payment.cardName) e.cardName = "Required";
    if (!payment.expiry) e.expiry = "Required";
    if (!payment.cvv || payment.cvv.length < 3) e.cvv = "Valid CVV required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleShippingNext = () => {
    if (validateShipping()) setStep(1);
  };

  const handlePlaceOrder = async () => {
    if (!validatePayment()) return;
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    clearCart();
    setStep(2);
  };

  const inputClass = (field: string) =>
    `w-full bg-void border ${
      errors[field] ? "border-red-500/60" : "border-card-border"
    } text-white placeholder-muted px-4 py-3 rounded-xl focus:outline-none focus:border-pumpkin/50 transition-colors text-sm`;

  if (cartItems.length === 0 && step !== 2) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <Package className="w-20 h-20 text-muted/20" />
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link href="/shop" className="btn-primary py-3 px-8">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="section-title text-5xl text-white">
            <span className="gradient-text-pumpkin">CHECKOUT</span>
          </h1>
        </motion.div>

        {/* Steps */}
        {step < 2 && (
          <div className="flex items-center gap-0 mb-10">
            {STEPS.slice(0, 2).map((s, i) => (
              <div key={s} className="flex items-center gap-0 flex-1">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                    i <= step
                      ? "bg-pumpkin text-void"
                      : "bg-surface border border-card-border text-muted"
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  {s}
                </div>
                {i < 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 rounded ${
                      step > i ? "bg-pumpkin" : "bg-card-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 0: Shipping */}
              {step === 0 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="card-surface p-6 space-y-5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Truck className="w-5 h-5 text-pumpkin" />
                    <h2 className="font-bold text-lg">Shipping Information</h2>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-muted text-xs uppercase tracking-wide mb-1 block">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={shipping.firstName}
                        onChange={(e) =>
                          setShipping({ ...shipping, firstName: e.target.value })
                        }
                        placeholder="John"
                        className={inputClass("firstName")}
                      />
                      {errors.firstName && (
                        <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-muted text-xs uppercase tracking-wide mb-1 block">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={shipping.lastName}
                        onChange={(e) =>
                          setShipping({ ...shipping, lastName: e.target.value })
                        }
                        placeholder="Doe"
                        className={inputClass("lastName")}
                      />
                      {errors.lastName && (
                        <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-muted text-xs uppercase tracking-wide mb-1 block">
                      Email
                    </label>
                    <input
                      type="email"
                      value={shipping.email}
                      onChange={(e) =>
                        setShipping({ ...shipping, email: e.target.value })
                      }
                      placeholder="john@example.com"
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-muted text-xs uppercase tracking-wide mb-1 block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={shipping.phone}
                      onChange={(e) =>
                        setShipping({ ...shipping, phone: e.target.value })
                      }
                      placeholder="+1 (555) 000-0000"
                      className={inputClass("phone")}
                    />
                  </div>

                  <div>
                    <label className="text-muted text-xs uppercase tracking-wide mb-1 block">
                      Address
                    </label>
                    <input
                      type="text"
                      value={shipping.address}
                      onChange={(e) =>
                        setShipping({ ...shipping, address: e.target.value })
                      }
                      placeholder="123 Haunted Lane"
                      className={inputClass("address")}
                    />
                    {errors.address && (
                      <p className="text-red-400 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-muted text-xs uppercase tracking-wide mb-1 block">
                        City
                      </label>
                      <input
                        type="text"
                        value={shipping.city}
                        onChange={(e) =>
                          setShipping({ ...shipping, city: e.target.value })
                        }
                        placeholder="Salem"
                        className={inputClass("city")}
                      />
                      {errors.city && (
                        <p className="text-red-400 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-muted text-xs uppercase tracking-wide mb-1 block">
                        State
                      </label>
                      <input
                        type="text"
                        value={shipping.state}
                        onChange={(e) =>
                          setShipping({ ...shipping, state: e.target.value })
                        }
                        placeholder="MA"
                        className={inputClass("state")}
                      />
                    </div>
                    <div>
                      <label className="text-muted text-xs uppercase tracking-wide mb-1 block">
                        ZIP
                      </label>
                      <input
                        type="text"
                        value={shipping.zip}
                        onChange={(e) =>
                          setShipping({ ...shipping, zip: e.target.value })
                        }
                        placeholder="01970"
                        className={inputClass("zip")}
                      />
                      {errors.zip && (
                        <p className="text-red-400 text-xs mt-1">{errors.zip}</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleShippingNext}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                  >
                    Continue to Payment
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Step 1: Payment */}
              {step === 1 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="card-surface p-6 space-y-5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <CreditCard className="w-5 h-5 text-pumpkin" />
                    <h2 className="font-bold text-lg">Payment Details</h2>
                    <div className="ml-auto flex items-center gap-1.5 text-slime text-xs">
                      <Lock className="w-3 h-3" />
                      Secure & Encrypted
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-pumpkin/5 border border-pumpkin/20">
                    <p className="text-pumpkin text-sm font-medium">
                      🎃 Demo Mode — No real charges will be made.
                    </p>
                    <p className="text-muted text-xs mt-1">
                      Use any test card details to complete the demo checkout.
                    </p>
                  </div>

                  <div>
                    <label className="text-muted text-xs uppercase tracking-wide mb-1 block">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={payment.cardNumber}
                      onChange={(e) => {
                        const val = e.target.value
                          .replace(/\D/g, "")
                          .replace(/(.{4})/g, "$1 ")
                          .trim()
                          .slice(0, 19);
                        setPayment({ ...payment, cardNumber: val });
                      }}
                      placeholder="4242 4242 4242 4242"
                      className={inputClass("cardNumber")}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-muted text-xs uppercase tracking-wide mb-1 block">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={payment.cardName}
                      onChange={(e) =>
                        setPayment({ ...payment, cardName: e.target.value })
                      }
                      placeholder="John Doe"
                      className={inputClass("cardName")}
                    />
                    {errors.cardName && (
                      <p className="text-red-400 text-xs mt-1">{errors.cardName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-muted text-xs uppercase tracking-wide mb-1 block">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={payment.expiry}
                        onChange={(e) => {
                          const val = e.target.value
                            .replace(/\D/g, "")
                            .replace(/^(\d{2})(\d)/, "$1/$2")
                            .slice(0, 5);
                          setPayment({ ...payment, expiry: val });
                        }}
                        placeholder="MM/YY"
                        className={inputClass("expiry")}
                      />
                      {errors.expiry && (
                        <p className="text-red-400 text-xs mt-1">{errors.expiry}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-muted text-xs uppercase tracking-wide mb-1 block">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={payment.cvv}
                        onChange={(e) =>
                          setPayment({
                            ...payment,
                            cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                          })
                        }
                        placeholder="123"
                        className={inputClass("cvv")}
                      />
                      {errors.cvv && (
                        <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(0)}
                      className="btn-ghost border border-card-border flex-none"
                    >
                      Back
                    </button>
                    <motion.button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      whileTap={{ scale: 0.97 }}
                      className="btn-primary flex-1 flex items-center justify-center gap-2 py-4 disabled:opacity-60"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-void border-t-transparent rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Place Order — ${orderTotal.toFixed(2)}
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Confirmation */}
              {step === 2 && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card-surface p-10 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-slime/20 border border-slime/40 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-slime" />
                  </motion.div>

                  <h2 className="text-3xl font-extrabold text-white mb-3">
                    Order Confirmed! 🎃
                  </h2>
                  <p className="text-muted mb-2">
                    Your haunted package is being conjured.
                  </p>
                  <p className="text-pumpkin font-bold text-lg mb-6">
                    Order ID: {orderId}
                  </p>

                  <div className="bg-void rounded-xl p-5 mb-8 text-left border border-card-border">
                    <p className="text-muted text-xs uppercase tracking-widest mb-4">
                      Order Summary
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted">Shipping to</span>
                        <span className="text-white">
                          {shipping.city || "Your address"}, {shipping.state || ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted">Estimated delivery</span>
                        <span className="text-white">3–5 business days</span>
                      </div>
                      <div className="flex justify-between border-t border-card-border pt-2 font-bold">
                        <span>Total charged</span>
                        <span className="text-pumpkin">${orderTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/shop" className="btn-primary flex-1 py-3 text-center">
                      Continue Shopping
                    </Link>
                    <Link
                      href="/"
                      className="btn-outline flex-1 py-3 text-center"
                    >
                      Back to Home
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary sidebar */}
          {step < 2 && (
            <div className="lg:col-span-1">
              <div className="card-surface p-5 sticky top-24">
                <h3 className="font-bold uppercase tracking-widest text-sm mb-5">
                  Order Summary
                </h3>
                <div className="space-y-3 mb-5 max-h-72 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-3"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate">{item.product.name}</p>
                        <p className="text-muted text-xs">
                          Size: {item.size} × {item.quantity}
                        </p>
                        <p className="text-pumpkin font-bold text-xs mt-0.5">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t border-card-border pt-4 text-sm">
                  <div className="flex justify-between text-muted">
                    <span>Subtotal</span>
                    <span className="text-white">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Shipping</span>
                    <span className={shipping_fee === 0 ? "text-slime" : "text-white"}>
                      {shipping_fee === 0 ? "FREE" : `$${shipping_fee.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted">
                    <span>Tax (8%)</span>
                    <span className="text-white">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-base border-t border-card-border pt-2">
                    <span>Total</span>
                    <span className="text-pumpkin">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
