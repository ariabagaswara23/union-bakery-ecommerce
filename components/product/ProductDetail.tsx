"use client";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useProductDetail } from "@/hooks/useProducts";
import { useState } from "react";
import { useAddToCart } from "@/hooks/useCart";
import { Input } from "../ui/input";

interface ProductDetailProps {
  slug: string;
}

const ProductDetail = ({ slug }: ProductDetailProps) => {
  const { data, isLoading, isError, error } = useProductDetail(slug);
  const addToCart = useAddToCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("18");
  const [hasCakeWording, setHasCakeWording] = useState(false);
  const [cakeWording, setCakeWording] = useState("");
  const [hasGreeting, setHasGreeting] = useState(false);
  const [greetingWording, setGreetingWording] = useState("");

  if (isLoading) {
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
          <div className="animate-pulse">
            <div className="bg-gray-200 h-125 md:h-150 rounded"></div>
          </div>
          <div className="p-8 space-y-6 pb-32 animate-pulse">
            <div className="bg-gray-200 h-8 rounded w-3/4"></div>
            <div className="bg-gray-200 h-6 rounded w-1/4"></div>
            <div className="bg-gray-200 h-24 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !data?.success || !data.data) {
    return (
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/image/product/detail-background.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 text-center bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-raisin-black mb-4">
            {error?.message === "Product not found"
              ? "Produk Tidak Ditemukan"
              : "Terjadi Kesalahan"}
          </h2>
          <a
            href="/products"
            className="inline-block bg-army-green text-white px-6 py-3 rounded font-semibold uppercase"
          >
            Back to Shop
          </a>
        </div>
      </section>
    );
  }

  const product = data.data;
  const sizeOption = product.options.find((opt) => opt.name === "Size");

  const formatPrice = (amount: string) => {
    return Math.round(parseFloat(amount) / 1000);
  };

  const currentVariant =
    product.variants.nodes.find((v) =>
      v.selectedOptions.some(
        (opt) => opt.name === "Size" && opt.value === selectedSize
      )
    ) || product.variants.nodes[0];

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // Validate variant
    if (!currentVariant?.id) {
      alert("Please select a size");
      return;
    }

    // Prepare cart input
    const cartInput = {
      variantId: currentVariant.id,
      quantity,
      cakeSize: selectedSize,
      cakeWording: hasCakeWording ? cakeWording : undefined,
      greetingWording: hasGreeting ? greetingWording : undefined,
      // ✅ Metadata untuk localStorage
      productTitle: product.title, // From API
      productHandle: product.handle, // From API
      price: currentVariant.price.amount, // From API
      imageUrl: product.images.nodes[0]?.url, // From API
    };

    console.log("Adding to cart:", cartInput);

    // Call mutation
    addToCart.mutate(cartInput);
  };

  if (addToCart.isSuccess) {
    setTimeout(() => {
      alert("Product added to cart!");
      addToCart.reset(); // Reset mutation state
    }, 100);
  }

  if (addToCart.isError) {
    setTimeout(() => {
      alert(`Failed to add to cart: ${addToCart.error?.message}`);
      addToCart.reset(); // Reset mutation state
    }, 100);
  }

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
          {product.images.nodes[0] && (
            <Image
              src={product.images.nodes[0].url}
              alt={product.title}
              fill
              className="object-contain"
            />
          )}
        </div>
        <div className="p-8 space-y-6 pb-32">
          <span className="badge">BEST SELLER</span>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2 text-black">
                {product.title}
              </h1>
              <p className="text-[#211D1F] font-normal text-sm">
                {product.description}
              </p>
            </div>
            <span
              style={{ fontFamily: "var(--font-rozha)" }}
              className="text-3xl font-normal text-[#661419]"
            >
              {formatPrice(currentVariant.price.amount)}
            </span>
          </div>
          <hr className="h-1 text-[#211D1F]" />
          <div>
            <h2 className="text-lg font-semibold text-[#211D1F] uppercase">
              Cake Size
            </h2>
            <RadioGroup
              value={selectedSize}
              onValueChange={setSelectedSize}
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
                checked={hasCakeWording}
                onCheckedChange={(checked) =>
                  setHasCakeWording(checked as boolean)
                }
                className="w-6 h-6 border-2 border-black text-[#211D1F]"
              />
            </div>
            {hasCakeWording && (
              <Input
                type="text"
                value={cakeWording}
                onChange={(e) => setCakeWording(e.target.value)}
                placeholder="Enter cake wording"
                maxLength={50}
                className="w-full mt-2 text-[#211D1F] border border-[#211D1F]/70"
              />
            )}
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
                checked={hasGreeting}
                onCheckedChange={(checked) =>
                  setHasGreeting(checked as boolean)
                }
                className="w-6 h-6 border-2 border-black text-[#211D1F]"
              />
            </div>
            {hasGreeting && (
              <Input
                type="text"
                value={greetingWording}
                onChange={(e) => setGreetingWording(e.target.value)}
                placeholder="Enter greeting message"
                maxLength={100}
                className="w-full mt-2 text-[#211D1F] border border-[#211D1F]/70"
              />
            )}
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
                        onClick={() => handleQuantityChange(-1)}
                        className="w-6 h-6 bg-transparent rounded-full border-2 border-gray-400 hover:border-[#5a6e3a]"
                      >
                        <span className="text-xl text-gray-600">-</span>
                      </Button>
                      <span className="text-xl font-bold text-[#211D1F] w-8 text-center">
                        {quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        className="w-6 h-6 bg-transparent rounded-full border-2 border-gray-400 hover:border-[#5a6e3a]"
                      >
                        <span className="text-xl text-gray-600">+</span>
                      </Button>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleAddToCart}
                  disabled={
                    !currentVariant.availableForSale || addToCart.isPending
                  }
                  className="bg-[#5a6e3a] hover:bg-[#4a5e2a] text-white px-12 py-4 rounded font-semibold uppercase max-w-37.5"
                >
                  {addToCart.isPending
                    ? "Adding..."
                    : !currentVariant.availableForSale
                    ? "Out of Stock"
                    : "Add to Cart"}
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
