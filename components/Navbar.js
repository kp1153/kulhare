// components/Navbar.js
"use client";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "होम" },
    { href: "/novels", label: "उपन्यास" },
    { href: "/poetry", label: "कविता" },
    { href: "/stories", label: "कहानी" },
    { href: "/criticism", label: "आलोचना" },
    { href: "/new-releases", label: "नए प्रकाशन" },
    { href: "/anuvad", label: "अनुवाद" },
    { href: "/vividh", label: "विविध" },
  ];

  return (
    <nav className="bg-[#006680] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="py-4 text-center border-b border-white/20 flex items-center justify-between md:justify-center">
          <Link href="/" className="flex-1 md:flex-none text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 relative">
                <Image
                  src="/logo.jpg"
                  alt="मेधा बुक्स Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">
                मेधा बुक्स
              </h1>
            </div>
           <p className="text-base md:text-lg font-bold text-white/90 italic px-2">
  कालजयी के साथ समकालीन लेखकों को भी दिया गया है भरपूर मौका
</p>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop + Mobile Menu */}
        <div className={`${isOpen ? "block" : "hidden"} md:block`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-3 md:gap-6 py-3 text-sm md:text-base">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-gray-200 transition px-4 py-2 md:p-0"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}