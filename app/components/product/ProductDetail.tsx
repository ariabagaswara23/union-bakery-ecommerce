import React from "react";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

const ProductDetail = () => {
  return (
    <section className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/product/detail-background.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative z-10 grid md:grid-cols-2 items-start gap-8 p-6 md:p-0">
        <div className="relative h-125 md:h-150 top-0">
          <Image
            src="/image/Cake1.png"
            alt="Red Velvet Cake"
            fill
            className="object-contain"
          />
        </div>
        <div className="p-8 space-y-6 pb-32">
          <span className="badge">BEST SELLER</span>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2 text-black">
                RED VELVET CAKE
              </h1>
              <p className="text-[#211D1F] font-normal text-sm">
                Red velvet sponge, cream cheese, nougat, rum
              </p>
            </div>
            <span
              style={{ fontFamily: "var(--font-rozha)" }}
              className="text-3xl font-normal text-[#661419]"
            >
              900
            </span>
          </div>
          <hr className="h-1 text-[#211D1F]" />
          <div>
            <h2 className="text-lg font-semibold text-[#211D1F] uppercase">
              Cake Size
            </h2>
            <RadioGroup
              defaultValue="20"
              className="grid grid-cols-2 lg:grid-cols-4 gap-3"
            >
              <div>
                <RadioGroupItem
                  value="18"
                  id="size-18"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="size-18"
                  className="flex flex-col gap-1 items-center justify-center border-2 border-dashed border-gray-300 peer-data-[state=checked]:border-solid peer-data-[state=checked]:border-[#3F4B1F] p-4 rounded text-center cursor-pointer transition hover:border-[#8b4513] h-20"
                >
                  <div
                    style={{ fontFamily: "var(--font-rozha)" }}
                    className="text-[32px] text-[#661419] font-bold"
                  >
                    18
                  </div>
                  <div className="text-sm text-[#211D1F]">cm</div>
                </Label>
              </div>

              <div>
                <RadioGroupItem
                  value="20"
                  id="size-20"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="size-20"
                  className="flex flex-col gap-1 items-center justify-center border-2 border-dashed border-gray-300 peer-data-[state=checked]:border-solid peer-data-[state=checked]:border-[#3F4B1F] p-4 rounded text-center cursor-pointer transition hover:border-[#8b4513] h-20"
                >
                  <div
                    style={{ fontFamily: "var(--font-rozha)" }}
                    className="text-[32px] text-[#661419] font-bold"
                  >
                    20
                  </div>
                  <div className="text-sm text-[#211D1F]">cm</div>
                </Label>
              </div>

              <div>
                <RadioGroupItem
                  value="24"
                  id="size-24"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="size-24"
                  className="flex flex-col gap-1 items-center justify-center border-2 border-dashed border-gray-300 peer-data-[state=checked]:border-solid peer-data-[state=checked]:border-[#3F4B1F] p-4 rounded text-center cursor-pointer transition hover:border-[#8b4513] h-20"
                >
                  <div
                    style={{ fontFamily: "var(--font-rozha)" }}
                    className="text-[32px] text-[#661419] font-bold"
                  >
                    24
                  </div>
                  <div className="text-sm text-[#211D1F]">cm</div>
                </Label>
              </div>

              <div>
                <RadioGroupItem
                  value="slice"
                  id="size-slice"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="size-slice"
                  className="flex flex-col gap-1 items-center justify-center border-2 border-dashed border-gray-300 peer-data-[state=checked]:border-solid peer-data-[state=checked]:border-[#3F4B1F] p-4 rounded text-center cursor-pointer transition hover:border-[#8b4513] h-20"
                >
                  <div
                    style={{ fontFamily: "var(--font-rozha)" }}
                    className="text-[32px] text-[#661419] font-semibold"
                  >
                    SLICE
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <hr className="h-1 border-dashed text-[#333333]" />
          <div className="">
            <div className="flex items-center justify-between mb-2">
              <div>
                <Label
                  htmlFor="cake-wording"
                  className="text-lg font-semibold text-[#211D1F] uppercase"
                >
                  ADD CAKE WORDING
                </Label>
                <p className="text-sm text-[#211D1F]">
                  Optional - max. 50 characters
                </p>
              </div>
              <Checkbox
                id="cake-wording"
                className="w-6 h-6 border-2 border-black"
              />
            </div>
            {/* <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded focus:border-[#8b4513] focus:outline-none"
              maxLength={50}
            /> */}
          </div>
          <hr className="h-1 border-dashed text-[#333333]" />
          <div className="">
            <div className="flex items-center justify-between mb-2">
              <div>
                <Label
                  htmlFor="cake-greeting-card"
                  className="text-lg font-semibold text-[#211D1F] uppercase"
                >
                  ADD GREETING CARD
                </Label>
                <p className="text-sm text-[#211D1F]">
                  Optional - max. 100 characters
                </p>
              </div>
              <Checkbox
                id="cake-greeting-card"
                className="w-6 h-6 border-2 border-black"
              />
            </div>
            {/* <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded focus:border-[#8b4513] focus:outline-none"
              maxLength={50}
            /> */}
          </div>
          <hr className="h-1 text-[#333333]" />
          <div>
            <h2 className="text-lg font-semibold text-[#211D1F] uppercase">
              Terms & Conditions
            </h2>
            <ul className="text-sm text-[#211D1F] space-y-2 list-disc pl-5">
              <li>
                Please allow up to 2 hours for order preparation before
                dispatch.
              </li>
              <li>
                Minimum purchase of IDR 350,000 (subtotal) for slice cake is
                required for delivery.
              </li>
              <li>
                Delivery is available with a flat fare of IDR 25,000 (DKI
                Jakarta, Alam Sutera, BSD, Gading Serpong & Karawaci), IDR
                125,000 (Depok, Tangerang & Bekasi), IDR 250,000 (Bogor) & IDR
                50,000 (Surabaya).
              </li>
              <li>
                Please note our cakes may contain allergens such as nuts, dairy,
                and gluten.
              </li>
              <li>
                Cancellations may be accommodated for orders that have not yet
                been dispatched or scheduled for same-day delivery. Please allow
                up to 14 working days for the refund process.
              </li>
            </ul>
          </div>
          <div className="fixed bottom-0 right-0 md:right-8 w-screen md:w-[45%] z-20 bg-white border border-[#211D1F]">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-medium text-[#211D1F]/70 uppercase">
                      Quantity
                    </span>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-6 h-6 bg-transparent rounded-full border-2 border-gray-400 hover:border-[#5a6e3a]"
                      >
                        <span className="text-xl text-gray-600">-</span>
                      </Button>
                      <span className="text-xl font-bold text-[#211D1F] w-8 text-center">
                        1
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-6 h-6 bg-transparent rounded-full border-2 border-gray-400 hover:border-[#5a6e3a]"
                      >
                        <span className="text-xl text-gray-600">+</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="bg-[#5a6e3a] hover:bg-[#4a5e2a] text-white px-12 py-4 rounded font-semibold uppercase max-w-37.5">
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
