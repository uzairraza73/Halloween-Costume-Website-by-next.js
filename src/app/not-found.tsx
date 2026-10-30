import Link from "next/link";
import { Ghost, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="relative mb-6">
        <Ghost className="w-24 h-24 text-pumpkin animate-bounce" strokeWidth={1.5} />
        <div className="absolute inset-0 blur-2xl bg-pumpkin/20 -z-10" />
      </div>
      <h1 className="text-6xl font-black text-white mb-2">404</h1>
      <h2 className="text-2xl font-bold text-pumpkin mb-4">LOST IN THE SHADOWS</h2>
      <p className="text-muted max-w-md mb-8">
        The spooky page or costume you are searching for has vanished into thin air or returned to the grave.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-pumpkin text-void font-bold hover:bg-pumpkin/90 transition-colors shadow-lg shadow-pumpkin/20"
        >
          <Home className="w-4 h-4" />
          Back Home
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-card-border bg-surface text-white font-bold hover:border-pumpkin/50 transition-colors"
        >
          <Search className="w-4 h-4" />
          Browse Shop All
        </Link>
      </div>
    </div>
  );
}
