import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="relative h-screen bg-cover bg-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/homepage/jumbotron.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 pb-8 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="relative md:ml-auto md:max-w-xl md:mr-8 lg:mr-16">
            {/* Blurred background layer */}
            <div className="absolute inset-0 bg-black/90 blur-[150px] rounded-lg"></div>

            {/* Text layer on top */}
            <div className="relative z-10 p-6 md:p-8">
              <h1 className="text-left text-white text-xl md:text-3xl font-bold leading-tight">
                HANDCRAFTED DELIGHTS <br /> FOR EVERY OCCASION. <br /> MADE
                FRESH DAILY.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
