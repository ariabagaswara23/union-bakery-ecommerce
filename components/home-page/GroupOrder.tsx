import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

const GroupOrder = () => {
  return (
    <section className="bg-white py-10 md:py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 w-full justify-between items-center">
          <div className="flex flex-col items-start">
            <Image
              src="/image/main-logo-black.png"
              alt="Union Bakery Logo"
              width={140}
              height={28}
              className="mb-4"
            />
            <h2 className="text-xl md:text-3xl font-bold text-black uppercase">
              Group Order
            </h2>
            <p className="font-medium text-sm text-[#211D1F] w-2/3">
              Whether you're treating clients or celebrating a company
              milestone, our cakes are sure to impress. We offer a variety of
              sizes to suit any occasion.
            </p>
            <Button className="mt-4 bg-[#3F4B1F] text-white block py-2 px-4 rounded-none uppercase font-bold">
              Discover More
            </Button>
          </div>
          <div className="mt-8 md:mt-0 flex-1">
            <Image
              src="/image/homepage/homepage-image-2.png"
              alt="Group Order"
              width={400}
              height={400}
              className="rounded-none w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupOrder;
