"use client";
import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";

const SignatureProducts = () => {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) {
    return (
      <section className="py-10 md:py-20 bg-white">
        <div className="flex flex-col gap-6 px-4 md:px-10">
          <div className="flex flex-row justify-between items-center w-full">
            <h2 className="text-[22px] md:text-[40px] font-bold text-black uppercase">
              Our Signature Cakes
            </h2>
            <Link href="/products">
              <button className="hidden md:block bg-transparent text-[#3F4B1F] text-sm md:text-base font-bold px-4 py-2 rounded hover:bg-[#2e3315] transition uppercase">
                Shop Now
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto md:overflow-x-visible -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex md:grid md:grid-cols-3 gap-6 min-w-max md:min-w-0">
              {Array.from({ length: 4 }, (_, i) => (
                <Card
                  key={i}
                  className="bg-transparent border-none shadow-none rounded-none flex-shrink-0 w-64 md:w-auto"
                >
                  <div className="animate-pulse">
                    <div className="bg-gray-200 aspect-square w-full mb-4 rounded"></div>
                    <div className="bg-gray-200 h-4 rounded w-3/4 mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data?.success || !data.data.length) {
    return null;
  }

  const signatureProducts = data.data.slice(0, 4);
  return (
    <section className="py-10 md:py-20 bg-white">
      <div className="flex flex-col gap-6 px-4 md:px-10">
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="text-[22px] md:text-[40px] font-bold text-black uppercase">
            Our Signature Cakes
          </h2>
          <Link href="/products">
            <button className="hidden md:block bg-transparent text-[#3F4B1F] text-sm md:text-base font-bold px-4 py-2 rounded hover:bg-[#2e3315] transition uppercase">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="overflow-x-auto md:overflow-x-visible -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex md:grid md:grid-cols-4 gap-6 min-w-max md:min-w-0">
            {signatureProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.handle}`}>
                <Card className="bg-transparent border-none shadow-none rounded-none flex-shrink-0 w-64 md:w-auto">
                  {product.media.nodes[0] && (
                    <Image
                      src={product.media.nodes[0].previewImage.url}
                      alt={
                        product.media.nodes[0].previewImage.altText ||
                        product.title
                      }
                      width={300}
                      height={300}
                      className="rounded-none! w-full aspect-square object-cover"
                    />
                  )}
                  <div className="flex flex-row justify-between mt-2">
                    <h3 className="text-lg font-semibold text-[#211D1F] uppercase">
                      {product.title}
                    </h3>
                    <span
                      style={{ fontFamily: "var(--font-rozha)" }}
                      className="text-xl font-normal text-[#661419] w-1/4 text-end"
                    >
                      {Math.round(
                        parseFloat(product.priceRange.maxVariantPrice.amount) /
                          1000
                      )}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
        <Link href="/products" className="w-full">
          <Button className="md:hidden bg-[#3F4B1F] w-full text-white text-sm md:text-base font-bold px-4 py-2 rounded hover:bg-[#2e3315] transition uppercase">
            Shop Now
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default SignatureProducts;
