import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";

const ProductList = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-6 py-20">
        <h2 className="text-3xl text-black font-bold uppercase">
          HANDCRAFTED SIGNATURE CAKES
        </h2>
        <p
          style={{ fontFamily: "var(--font-eb-garamond)" }}
          className="font-normal text-[18px] text-black italic"
        >
          *All prices shown are in thousands of rupiah
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-8">
          {[
            { name: "Red Velvet", price: "850", image: "/image/Cake1.png" },
            { name: "Vanilla Cake", price: "750", image: "/image/Cake1.png" },
            { name: "Chocolate Cake", price: "750", image: "/image/Cake1.png" },
            { name: "Red Velvet", price: "850", image: "/image/Cake1.png" },
            { name: "Vanilla Cake", price: "750", image: "/image/Cake1.png" },
            { name: "Chocolate Cake", price: "750", image: "/image/Cake1.png" },
          ].map((product, index) => (
            <Card
              key={index}
              className="bg-transparent border-0 shadow-none rounded-none"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="rounded-none! w-full"
              />
              <div className="flex flex-row justify-between">
                <h3 className="text-lg font-semibold text-[#211D1F] uppercase">
                  {product.name}
                </h3>
                <span
                  style={{ fontFamily: "var(--font-rozha)" }}
                  className="text-xl font-normal text-[#661419]"
                >
                  {product.price}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;
