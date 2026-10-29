"use client";

import Link from "next/link";
import { Ghost, Mail, Share2, Rss, Video, Users } from "lucide-react";
import { useState } from "react";

const FOOTER_LINKS = {
  Shop: [
    { label: "All Costumes", href: "/shop" },
    { label: "Scary & Horror", href: "/shop?category=scary" },
    { label: "Vampire & Gothic", href: "/shop?category=vampire-gothic" },
    { label: "Witchcraft", href: "/shop?category=witchcraft" },
    { label: "Superhero", href: "/shop?category=superhero" },
    { label: "Kids", href: "/shop?category=kids" },
    { label: "Couples", href: "/shop?category=couples" },
    { label: "Props & Decor", href: "/shop?category=props" },
  ],
  Support: [
    { label: "Size Guide", href: "#" },
    { label: "Shipping Info", href: "#" },
    { label: "Returns & Exchanges", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Contact Us", href: "#" },
  ],
  Company: [
    { label: "About Halloween Haven", href: "/about" },
    { label: "Sustainability", href: "#" },
    { label: "Press & Media", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Affiliates", href: "#" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-surface border-t border-card-border">
      {/* Newsletter */}
      <div className="border-b border-card-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="section-title text-3xl mb-3">
            <span className="gradient-text-pumpkin">JOIN THE COVEN</span>
          </h3>
          <p className="text-muted mb-8 max-w-md mx-auto">
            Get exclusive deals, early access to new collections, and Halloween
            styling tips delivered to your crypt.
          </p>
          {subscribed ? (
            <div className="inline-flex items-center gap-3 bg-slime/10 border border-slime/30 text-slime px-8 py-4 rounded-full font-medium">
              <span>🎃</span> You&apos;re in the coven! Check your inbox.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full bg-void border border-card-border text-white placeholder-muted pl-10 pr-4 py-3 rounded-full focus:outline-none focus:border-pumpkin/50 transition-colors"
                />
              </div>
              <button type="submit" className="btn-primary py-3 px-6 whitespace-nowrap">
                Join Now
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Ghost className="w-8 h-8 text-pumpkin" strokeWidth={1.5} />
              <span
                className="text-xl font-extrabold tracking-wider"
                style={{ fontFamily: "Bebas Neue, Inter, sans-serif", letterSpacing: "0.1em" }}
              >
                <span className="gradient-text-pumpkin">HALLOWEEN</span>
                <span className="text-white ml-1">HAVEN</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6 max-w-xs">
              The premier destination for premium Halloween costumes, accessories,
              and props since 2018. Crafted for the truly haunted.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Share2, href: "#", label: "Instagram" },
                { Icon: Rss, href: "#", label: "Twitter / X" },
                { Icon: Video, href: "#", label: "YouTube" },
                { Icon: Users, href: "#", label: "Facebook" },
              ].map(({ Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={label}
                  title={label}
                  className="w-9 h-9 rounded-full border border-card-border flex items-center justify-center text-muted hover:text-pumpkin hover:border-pumpkin/40 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted text-sm hover:text-pumpkin transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-card-border mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © 2026 Halloween Haven. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              {["VISA", "MC", "AMEX", "PAYPAL", "APPLE"].map((card) => (
                <span
                  key={card}
                  className="text-xs bg-white/5 border border-card-border px-2 py-1 rounded text-muted font-mono"
                >
                  {card}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
