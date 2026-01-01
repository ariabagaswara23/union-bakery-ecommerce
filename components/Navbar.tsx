"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CartDrawer } from "./cart/Cart";
import { useIsAuthenticated, useLogout } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useCustomer } from "@/hooks/useCustomer";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const pathname = usePathname();

  const isAuthenticated = useIsAuthenticated();
  const { data: customerData, isLoading: isLoadingCustomer } = useCustomer();
  const logout = useLogout();

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

  const customer = customerData?.data;
  const customerName = customer
    ? `${customer.firstName} ${customer.lastName}`.trim()
    : null;

  const handleLogout = () => {
    logout.mutate();
  };

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
                href="#group"
                className="text-white hover:text-gray-300 font-bold text-xs uppercase"
              >
                Group Order
              </Link>
              <Link
                href="#faq"
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
              {isAuthenticated && customerName ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white hover:text-gray-300 font-bold text-xs uppercase hidden md:flex items-center gap-1 outline-none">
                    <User className="w-4 h-4" />
                    {customerName}
                    <ChevronDown className="w-3 h-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-48 bg-white z-[999]"
                  >
                    <DropdownMenuLabel className="text-[#211D1F]">
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 focus:text-red-600 text-xs uppercase"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : isLoadingCustomer ? (
                <div className="text-white text-xs uppercase">Loading...</div>
              ) : (
                <Link
                  href="/login"
                  className="hidden md:flex text-white hover:text-gray-300 font-bold text-xs uppercase"
                >
                  Account
                </Link>
              )}
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
                href="#group"
                className="text-white hover:text-gray-300 font-bold text-xs uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                Group Order
              </Link>
              <Link
                href="#faq"
                className="text-white hover:text-gray-300 font-bold text-xs uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <div className="w-full border-t border-white my-2"></div>
              {isAuthenticated && customerName ? (
                <>
                  <div className="text-white font-bold text-sm uppercase mt-2">
                    {customerName}
                  </div>
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                    className="text-red-300 hover:text-red-400 font-bold text-xs uppercase"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="text-white hover:text-gray-300 font-bold text-xs uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>
      <CartDrawer open={openCart} onOpenChange={setOpenCart} />
    </>
  );
};

export default Navbar;
