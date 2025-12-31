"use client";

import Footer from "@/components/Footer";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false,
});

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
