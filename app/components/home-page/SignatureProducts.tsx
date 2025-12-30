import { Card } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const SignatureProducts = () => {
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
            {[
              { name: "Red Velvet", price: "850", image: "/image/Cake1.png" },
              { name: "Vanilla Cake", price: "750", image: "/image/Cake1.png" },
              {
                name: "Chocolate Cake",
                price: "750",
                image: "/image/Cake1.png",
              },
            ].map((product) => (
              <Card
                key={product.name}
                className="bg-transparent border-none shadow-none rounded-none"
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
