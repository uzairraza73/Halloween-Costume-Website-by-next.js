"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, TrendingUp, Sparkles, ShoppingCart, Flame } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

// ============ Floating ember particles ============
const EMBER_POSITIONS = [
  { left: "8%", top: "15%", size: 3, color: "#FF7518" },
  { left: "15%", top: "65%", size: 4, color: "#FFA726" },
  { left: "23%", top: "30%", size: 3, color: "#FF7518" },
  { left: "72%", top: "20%", size: 5, color: "#FFA726" },
  { left: "88%", top: "55%", size: 3, color: "#FF7518" },
  { left: "93%", top: "80%", size: 4, color: "#FFA726" },
  { left: "50%", top: "10%", size: 3, color: "#FF7518" },
  { left: "35%", top: "75%", size: 4, color: "#FF7518" },
  { left: "60%", top: "85%", size: 3, color: "#FFA726" },
  { left: "78%", top: "40%", size: 5, color: "#FF7518" },
  { left: "45%", top: "45%", size: 3, color: "#FFA726" },
  { left: "5%", top: "85%", size: 4, color: "#FF7518" },
];

// ============ Hero Section ============
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const featuredBestsellers = [
    {
      title: "Spooky Decor",
      href: "/shop?filter=spooky-decor",
      image: "/images/decor-enhanced/60-inch Bloody Window Poster Set.webp",
      tag: "31 Exclusive Decor Items",
    },
    {
      title: "Costumes & Masks",
      href: "/shop?category=witchcraft",
      image: "/images/costumes_masks.jpg",
      tag: "Witches & Reapers",
    },
    {
      title: "Creepy Treats",
      href: "/shop?category=accessories",
      image: "/images/creepy_treats.jpg",
      tag: "Candy & Goodie Bags",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ background: "#0B0D14" }}
    >
      {/* ── MAIN HERO BANNER ─────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ minHeight: "calc(100vh - 0px)" }}
      >
        {/* Background image – castle/moon on RIGHT side */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/halloween_hero_bg_right.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center top",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Strong dark gradient on left so text pops, fades right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,5,11,0.97) 0%, rgba(7,5,11,0.82) 35%, rgba(7,5,11,0.45) 55%, rgba(7,5,11,0.10) 75%, transparent 100%)",
          }}
        />
        {/* Bottom dark fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: "linear-gradient(to top, #0B0D14, transparent)" }}
        />

        {/* Ambient glow top-left */}
        <div
          className="absolute top-0 left-0 w-[500px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top left, rgba(255,117,24,0.12) 0%, transparent 65%)" }}
        />

        {/* Floating embers */}
        {EMBER_POSITIONS.map((e, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: e.left,
              top: e.top,
              width: e.size,
              height: e.size,
              background: e.color,
              boxShadow: `0 0 ${e.size * 3}px ${e.color}`,
            }}
            animate={{
              y: [0, -28, 0],
              x: [0, i % 2 === 0 ? 8 : -8, 0],
              opacity: [0.3, 0.9, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 5),
              delay: i * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* ─ HERO CONTENT: Split layout ─ */}
        <motion.div
          style={{ y }}
          className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 items-center gap-0 pt-16 pb-12 lg:pt-24 lg:pb-24"
        >
          {/* LEFT: Promotional text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            className="flex flex-col items-start text-left max-w-xl"
          >
            {/* Seasonal badge */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{
                background: "rgba(255,117,24,0.15)",
                border: "1px solid rgba(255,117,24,0.4)",
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF7518]" />
              <span className="text-[#FF7518] text-xs font-bold tracking-widest uppercase">
                Get Ready for the Spooky Season
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#FF7518]" />
            </motion.div>

            {/* ALL HALLOWEEN GEAR headline without 50% OFF */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="mb-8"
            >
              <h1
                className="font-black uppercase leading-tight"
                style={{
                  fontFamily: "'Bebas Neue', Impact, sans-serif",
                  fontSize: "clamp(3rem, 6.5vw, 5.5rem)",
                  background: "linear-gradient(180deg, #FFF176 0%, #FFA000 40%, #E65100 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 4px 20px rgba(255,140,0,0.5))",
                  letterSpacing: "0.04em",
                }}
              >
                ALL HALLOWEEN GEAR!
              </h1>
            </motion.div>

            {/* Shop Now button – carved pumpkin style */}
            <motion.div
              variants={{ hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45 } } }}
              className="relative"
            >
              {/* Pumpkin stem */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                style={{
                  width: 14,
                  height: 14,
                  background: "linear-gradient(to top, #1b5e20, #33691e)",
                  borderRadius: "3px 4px 0 0",
                  transform: "rotate(6deg) translateX(-50%)",
                }}
              />
              <Link
                href="/shop"
                className="pumpkin-btn-3d relative inline-flex items-center justify-center font-extrabold tracking-wide"
                style={{
                  fontFamily: "'Henny Penny', 'Creepster', cursive, sans-serif",
                  fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)",
                  paddingLeft: "3rem",
                  paddingRight: "3rem",
                  paddingTop: "0.9rem",
                  paddingBottom: "0.9rem",
                  borderRadius: 50,
                  color: "white",
                  textShadow: "0 2px 6px rgba(0,0,0,0.7)",
                }}
              >
                Shop Now
              </Link>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.3 } } }}
              className="flex items-center gap-7 mt-10"
            >
              {[
                { value: "50K+", label: "Happy Customers" },
                { value: "200+", label: "Costumes" },
                { value: "4.9★", label: "Avg Rating" },
              ].map((s) => (
                <div key={s.label} className="text-left">
                  <p className="text-2xl font-extrabold" style={{ color: "#FF7518" }}>{s.value}</p>
                  <p className="text-xs" style={{ color: "#8B7FA0" }}>{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Empty – the background image provides the visual */}
          <div className="hidden lg:block" />
        </motion.div>
      </div>

      {/* ── FEATURED CATEGORIES: SPOOKY BESTSELLERS ─────────── */}
      <div
        className="relative z-10 w-full pb-16 pt-6"
        style={{
          backgroundImage: "url('/images/halloween_hero_bg_right.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      >
        {/* Overlay so cards read clearly */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(7,5,11,0.75)" }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          {/* Section heading */}
          <div className="text-center mb-8">
            <p
              className="text-sm font-semibold uppercase tracking-[0.2em] mb-1"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Featured Categories
            </p>
            <h2
              className="font-extrabold uppercase"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                letterSpacing: "0.14em",
                color: "#FF9E2C",
                textShadow: "0 0 18px rgba(255,158,44,0.65)",
              }}
            >
              SPOOKY BESTSELLERS
            </h2>
          </div>

          {/* 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featuredBestsellers.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.13 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link
                  href={item.href}
                  className="spooky-box block"
                >
                  {/* Square image */}
                  <div className="relative aspect-square w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width:640px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(12,8,22,0.85) 0%, rgba(12,8,22,0.2) 50%, transparent 100%)",
                      }}
                    />
                  </div>

                  {/* Label */}
                  <div
                    className="py-4 px-4 text-center"
                    style={{ background: "#120b1c" }}
                  >
                    <p className="text-white font-bold text-base sm:text-lg tracking-wide group-hover:text-[#FFA726] transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "#8B7FA0" }}>
                      {item.tag}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ Category Showcase ============
function CategoryShowcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p
          className="text-sm font-bold uppercase tracking-widest mb-2"
          style={{ color: "#FF7518" }}
        >
          Browse by Category
        </p>
        <h2 className="section-title text-white">
          Every Kind of{" "}
          <span className="gradient-text-pumpkin">Haunting</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <Link
              href={`/shop?category=${cat.slug}`}
              className="spooky-box group relative block aspect-[4/3] overflow-hidden"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width:640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,9,16,0.92) 0%, rgba(11,9,16,0.3) 55%, transparent 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <h3 className="font-bold text-sm group-hover:text-[#FF7518] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs mt-0.5" style={{ color: "#8B7FA0" }}>
                  {cat.count} styles
                </p>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ArrowRight className="w-4 h-4 text-[#FF7518]" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============ Featured Products ============
const TABS = [
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "new", label: "New Arrivals", icon: Sparkles },
  { id: "bestseller", label: "Best Sellers", icon: Star },
];

function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("trending");

  const filtered = PRODUCTS.filter((p) => {
    if (activeTab === "trending") return p.isTrending;
    if (activeTab === "new") return p.isNew;
    if (activeTab === "bestseller") return p.isBestSeller;
    return true;
  });

  return (
    <section
      className="py-20"
      style={{ background: "rgba(18,10,28,0.7)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p
            className="text-sm font-bold uppercase tracking-widest mb-2"
            style={{ color: "#FF7518" }}
          >
            Featured Collection
          </p>
          <h2 className="section-title text-white">
            This Season&apos;s{" "}
            <span className="gradient-text-spectral">Finest</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                style={
                  activeTab === tab.id
                    ? {
                        background: "#FF7518",
                        color: "#0B0910",
                        boxShadow: "0 0 16px rgba(255,117,24,0.5)",
                      }
                    : {
                        background: "transparent",
                        color: "#8B7FA0",
                        border: "1px solid #2A1F3D",
                      }
                }
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-bold px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-105"
            style={{
              border: "1.5px solid #FF7518",
              color: "#FF7518",
            }}
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ============ Brand Story / CTA Banner ============
function BrandBanner() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* bg glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: "#8B5CF6" }}
            >
              Our Story
            </p>
            <h2 className="section-title text-4xl text-white mb-6">
              CRAFTED FOR THE{" "}
              <span className="gradient-text-spectral">TRULY HAUNTED</span>
            </h2>
            <p className="leading-relaxed mb-5" style={{ color: "#8B7FA0" }}>
              Since 2018, Halloween Haven has been the premier destination for enthusiasts who
              demand more than a costume — they demand an experience. Every piece is designed
              with theatrical precision, premium materials, and obsessive attention to detail.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: "#8B7FA0" }}>
              From blockbuster-quality hero suits to hand-crafted gothic gowns, we don&apos;t
              just sell costumes — we sell the feeling of complete transformation.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5">
              {[
                { value: "200+", label: "Unique Costumes" },
                { value: "50K+", label: "Transformed Souls" },
                { value: "8", label: "Years of Haunting" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl text-center"
                  style={{ background: "rgba(26,16,40,0.7)", border: "1px solid #2A1F3D" }}
                >
                  <p className="text-2xl font-extrabold" style={{ color: "#FF7518" }}>
                    {stat.value}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#8B7FA0" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="relative h-96 rounded-3xl overflow-hidden"
              style={{ boxShadow: "0 0 30px rgba(139,92,246,0.3)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=800&q=80"
                alt="Halloween atmosphere"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,0.25) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Floating badge – rating */}
            <motion.div
              animate={{ y: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-4 -right-4 rounded-2xl p-4 text-center"
              style={{
                background: "rgba(21,16,29,0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,117,24,0.3)",
              }}
            >
              <p className="text-3xl font-extrabold" style={{ color: "#FF7518" }}>4.9</p>
              <div className="flex justify-center gap-0.5 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#FF7518] text-[#FF7518]" />
                ))}
              </div>
              <p className="text-xs" style={{ color: "#8B7FA0" }}>Avg Rating</p>
            </motion.div>

            {/* Floating badge – shipping */}
            <motion.div
              animate={{ y: [3, -3, 3] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -bottom-4 -left-4 rounded-2xl p-4"
              style={{
                background: "rgba(21,16,29,0.85)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(184,243,74,0.3)",
              }}
            >
              <p className="font-bold text-sm" style={{ color: "#B8F34A" }}>
                🎃 Free Shipping
              </p>
              <p className="text-xs mt-0.5" style={{ color: "#8B7FA0" }}>
                On orders over $75
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============ Newsletter Banner ============
function NewsletterBanner() {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{ background: "rgba(20,8,32,0.9)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,117,24,0.08) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
        <Flame className="w-10 h-10 mx-auto mb-4" style={{ color: "#FF7518" }} />
        <h2 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.08em" }}>
          UNLOCK EXCLUSIVE SPOOKY DEALS
        </h2>
        <p className="mb-7" style={{ color: "#8B7FA0" }}>
          Join our crypt community — get first access to limited drops, 20% off your first order, and horror-grade styling tips.
        </p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-full text-sm outline-none"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,117,24,0.35)",
              color: "white",
            }}
          />
          <button
            type="submit"
            className="pumpkin-btn-3d px-6 py-3 rounded-full font-bold text-sm text-white"
          >
            Join
          </button>
        </form>
      </div>
    </section>
  );
}

// ============ Main Page ============
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <BrandBanner />
      <NewsletterBanner />
    </>
  );
}
