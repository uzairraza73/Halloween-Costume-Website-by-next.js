import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { NotificationStack } from "@/components/ui/NotificationStack";
import { SearchModal } from "@/components/ui/SearchModal";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

export const metadata: Metadata = {
  title: "Halloween Haven — Premium Animated Halloween Costume Store",
  description:
    "Discover the most premium Halloween costumes, characters, and accessories. Shop 200+ professionally crafted costumes for adults, kids, couples, and groups. Free shipping on orders over $75.",
  keywords: [
    "Halloween Haven",
    "Halloween costumes",
    "Addams Family costumes",
    "Beetlejuice costumes",
    "scary costumes",
    "vampire costumes",
    "witch costumes",
    "superhero Halloween",
    "kids Halloween",
    "couples costumes",
    "inflatable costumes",
    "Halloween props",
    "gothic costumes",
  ],
  openGraph: {
    title: "Halloween Haven — Premium Animated Halloween Costume Store",
    description:
      "The premier Halloween costume destination with screen-grade outfits and rapid crypt delivery.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-void text-white antialiased">
        <AnnouncementBar />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <CartDrawer />
        <SearchModal />
        <NotificationStack />
      </body>
    </html>
  );
}
