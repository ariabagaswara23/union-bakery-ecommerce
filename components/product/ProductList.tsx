"use client";
import { Card } from "../ui/card";
import Image from "next/image";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import { ProductCard } from "./ProductCard";

const ProductList = () => {
  const { data, isLoading, isError, error } = useProducts();

  if (isLoading) {
    return (
      <>
        <div className="bg-white flex flex-col">
          <div className="bg-gray-200 aspect-video w-full h-10 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-20">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card
                key={i}
                className="bg-transparent border-0 shadow-none rounded-none"
              >
                <div className="animate-pulse">
                  <div className="bg-gray-200 aspect-square w-full mb-4"></div>
                  <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">
          Gagal memuat produk: {error.message}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#3F4B1F] text-white px-6 py-2 rounded uppercase font-semibold"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  if (!data?.success || !data.data.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Tidak ada produk tersedia</p>
      </div>
    );
  }

  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl text-black font-bold uppercase">
          HANDCRAFTED SIGNATURE CAKES
        </h2>
        <p
          style={{ fontFamily: "var(--font-eb-garamond)" }}
          className="font-normal text-[18px] text-black/70 italic"
        >
          *All prices shown are in thousands of rupiah
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-8">
          {data?.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
