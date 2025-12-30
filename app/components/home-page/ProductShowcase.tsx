import React from "react";
import Image from "next/image";

const ProductShowcase = () => {
  return (
    <section className="relative h-screen bg-cover bg-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/homepage/homepage-image-1.png"
          alt="UNION MADE IS WELL MADE"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="container mx-auto px-4">
          <div className="relative md:max-w-xl">
            {/* Blurred background layer */}
            <div className="absolute inset-0 bg-black/10 blur-[150px] rounded-lg"></div>

            {/* Content layer on top */}
            <div className="relative z-10 p-6 md:p-8">
              <h1 className="text-left text-white text-xl md:text-3xl font-bold leading-tight">
                UNION MADE IS WELL MADE
              </h1>
              <p className="font-medium text-sm text-white">
                Our cakes are crafted with premium ingredients to guarantee
                quality in every bite
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
