import React from "react";
import Hero from "../components/home-page/Hero";
import SignatureProducts from "../components/home-page/SignatureProducts";
import ProductShowcase from "../components/home-page/ProductShowcase";
import GroupOrder from "../components/home-page/GroupOrder";

export default function Page() {
  return (
    <>
      <Hero />
      <SignatureProducts />
      <ProductShowcase />
      <GroupOrder />
    </>
  );
}
