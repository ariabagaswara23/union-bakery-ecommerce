"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CartDrawer } from "./cart/Cart";
import { mockCartData } from "../lib/mockdata";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";
  const bgColor = isHomePage
    ? hasScrolled
      ? "bg-[#3F4B1F]"
      : "bg-transparent"
    : "bg-[#3F4B1F]";

  return (
    <>
      <header
        className={`${
          isHomePage ? "fixed" : "relative"
        } top-0 left-0 right-0 z-99 transition-colors duration-300 ${bgColor}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="shrink-0">
              <Link href="/">
                <Image
                  src="/image/main-logo.svg"
                  alt="Union Bakery Logo"
                  width={120}
                  height={40}
                />
              </Link>
            </div>
            <nav className="hidden md:flex flex-1 justify-end items-center space-x-6">
              <Link
                href="/products"
                className="text-white hover:text-gray-300 font-bold text-xs uppercase"
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-gray-300 font-bold text-xs uppercase"
              >
                Group Order
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-gray-300 font-bold text-xs uppercase"
              >
                FAQ
              </Link>
            </nav>
            <div className="hidden md:block text-white mx-6">•</div>
            <div className="flex items-center space-x-3 md:space-x-6">
              <button
                onClick={() => setOpenCart(true)}
                className="text-white hover:text-gray-300 font-bold text-xs uppercase"
              >
                Cart
              </button>
              <Link
                href="/login"
                className="hidden md:flex text-white hover:text-gray-300 font-bold text-xs uppercase"
              >
                Account
              </Link>

              {/* Hamburger */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white hover:text-gray-300 focus:outline-none"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#3F4B1F] border-t border-gray-700">
            <nav className="flex flex-col items-start space-y-4 py-4 px-4">
              <Link
                href="/products"
                className="text-white hover:text-gray-300 font-bold text-xs uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-gray-300 font-bold text-xs uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Group Order
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-gray-300 font-bold text-xs uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/login"
                className="text-white hover:text-gray-300 font-bold text-xs uppercase"
              >
                Account
              </Link>
            </nav>
          </div>
        )}
      </header>
      <CartDrawer open={openCart} onOpenChange={setOpenCart} />
    </>
  );
};

export default Navbar;
