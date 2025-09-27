"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { cart } = useCart();
  const cartItems = cart?.items || [];

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const navItems = [
    { href: "/", label: "होम" },
    { href: "/books", label: "पुस्तकें" },
    { href: "/authors", label: "लेखक" },
    { href: "/magazine", label: "पत्रिका / ब्लॉग" },
    { href: "/news", label: "समाचार" },
    { href: "/about", label: "हमारे बारे में" },
    { href: "/contact", label: "संपर्क" },
  ];

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-amber-700 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-white text-2xl font-bold hover:text-amber-200 transition-colors"
          >
            कुल्हारे प्रकाशन
          </Link>

          {/* Navigation Links + Cart */}
          <div className="flex flex-wrap items-center justify-end gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md font-medium text-sm sm:text-base transition-all duration-300 hover:bg-amber-600 hover:text-white ${
                  isActive(item.href)
                    ? "bg-amber-900 text-white shadow"
                    : "text-amber-100"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Cart Icon with Count */}
            <Link
              href="/cart"
              className={`relative px-3 py-2 rounded-md font-medium text-sm sm:text-base transition-all duration-300 hover:bg-amber-600 hover:text-white flex items-center gap-2 ${
                pathname === "/cart"
                  ? "bg-amber-900 text-white shadow"
                  : "text-amber-100"
              }`}
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">कार्ट</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
