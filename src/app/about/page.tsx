"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Ghost, ShieldCheck, Sparkles, Heart, Award, Flame, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pumpkin/40 bg-pumpkin/10 text-pumpkin text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4" />
            Our Haunted Story & Mission
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-wide mb-6">
            WELCOME TO <span className="gradient-text-pumpkin">HALLOWEEN HAVEN</span>
          </h1>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Born from a lifelong passion for high-production thrills, theatrical costumery, and the magic of October 31st. We don&apos;t just sell costumes — we engineer unforgettable transformations.
          </p>
        </motion.div>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
              FROM A BASEMENT CRYPT TO A NATIONWIDE COVEN
            </h2>
            <p className="text-muted leading-relaxed">
              In 2018, a crew of creature designers and theater costume makers grew tired of flimsy plastic suits and scratchy fabrics that tore before midnight. We set out to design screen-grade costumes that feel comfortable, look spine-chilling, and stand the test of time.
            </p>
            <p className="text-muted leading-relaxed">
              Today, Halloween Haven outfits thousands of thrill-seekers, party legends, and trick-or-treaters across the country with exclusive, movie-inspired collections.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-card-border">
              <div>
                <span className="block text-3xl font-extrabold text-pumpkin">200+</span>
                <span className="text-xs text-muted">Unique Designs</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-spectral">98.8%</span>
                <span className="text-xs text-muted">Satisfaction Rate</span>
              </div>
              <div>
                <span className="block text-3xl font-extrabold text-slime">50k+</span>
                <span className="text-xs text-muted">Spooky Souls Outfitted</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-pumpkin/30 shadow-2xl shadow-pumpkin/10"
          >
            <Image
              src="https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=1000&q=80"
              alt="Halloween Haven Workshop"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass border border-white/10">
              <span className="text-xs font-bold text-pumpkin uppercase tracking-wider block mb-1">
                Handcrafted Precision
              </span>
              <p className="text-xs text-white/90">
                Every stitch, drape, and LED accent is vetted by our team of Halloween enthusiasts.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="card-surface p-8 border border-card-border hover:border-pumpkin/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-pumpkin/10 border border-pumpkin/30 flex items-center justify-center text-pumpkin mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Theatrical Quality</h3>
            <p className="text-sm text-muted leading-relaxed">
              Breathable double-lined fabrics, reinforced wire hoods, and heavy drapery that looks authentic in any light.
            </p>
          </div>

          <div className="card-surface p-8 border border-card-border hover:border-spectral/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-spectral/10 border border-spectral/30 flex items-center justify-center text-spectral mb-6">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Fast Crypt Delivery</h3>
            <p className="text-sm text-muted leading-relaxed">
              Lightning-fast fulfillment and tracking so your gear arrives well before your haunted gatherings.
            </p>
          </div>

          <div className="card-surface p-8 border border-card-border hover:border-slime/40 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-slime/10 border border-slime/30 flex items-center justify-center text-slime mb-6">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Hassle-Free Returns</h3>
            <p className="text-sm text-muted leading-relaxed">
              Size not quite right? Enjoy 30-day effortless exchanges so you can conquer the night with complete confidence.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center p-10 rounded-3xl bg-gradient-to-r from-pumpkin/15 via-surface to-spectral/15 border border-pumpkin/30">
          <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white mb-3">
            Ready to find your alter ego?
          </h3>
          <p className="text-muted text-sm max-w-md mx-auto mb-6">
            Dive into our full catalog of horror, superhero, couples, and kids collections.
          </p>
          <Link href="/shop" className="btn-primary inline-flex items-center gap-2 text-sm font-bold">
            <span>Explore Costumes Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
