"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { DrawerHeader, DrawerTitle, DrawerClose } from "../ui/drawer";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { CartLineNode } from "../../types/cart";

interface CartEditProps {
  item: CartLineNode;
  onBack: () => void;
  onSave: (
    id: string,
    quantity: number,
    cakeWording: string,
    greeting: string
  ) => void;
}

const CartEdit = ({ item, onBack, onSave }: CartEditProps) => {
  const { id, quantity: initialQuantity, attributes, merchandise } = item;

  const initialCakeWording =
    attributes.find((attr) => attr.key.toLowerCase().includes("cake wording"))
      ?.value || "";
  const initialGreeting =
    attributes.find((attr) => attr.key.toLowerCase().includes("greeting"))
      ?.value || "";
  const cakeSize =
    attributes.find((attr) => attr.key === "cakesize")?.value || "18cm";

  const [quantity, setQuantity] = useState(initialQuantity);
  const [hasCakeWording, setHasCakeWording] = useState(!!initialCakeWording);
  const [cakeWording, setCakeWording] = useState(initialCakeWording);
  const [hasGreeting, setHasGreeting] = useState(!!initialGreeting);
  const [greeting, setGreeting] = useState(initialGreeting);

  const formatPrice = (amount: string) => {
    return Math.round(parseFloat(amount) / 1000);
  };

  const handleSave = () => {
    onSave(
      id,
      quantity,
      hasCakeWording ? cakeWording : "",
      hasGreeting ? greeting : ""
    );
  };

  return (
    <div className="flex flex-col h-full z-10">
      <DrawerHeader className="border-b bg-white">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-[#211D1F]" />
          </Button>
          <DrawerTitle className="text-2xl font-bold text-[#211D1F]">
            EDIT ITEM
          </DrawerTitle>
        </div>
      </DrawerHeader>
      <div className="flex-1 overflow-y-auto p-6 bg-white">
        <div className="space-y-6">
          <div className="flex gap-4 pb-6 border-b border-dashed">
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src={merchandise.image.url}
                alt={merchandise.product?.title || "Product"}
                fill
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-sm uppercase text-[#211D1F]">
                {merchandise.product?.title || "Product"}
              </h3>
              <p className="text-xs text-gray-600">{cakeSize}</p>
              <p
                style={{ fontFamily: "var(--font-rozha)" }}
                className="font-normal text-base text-[#661419] mt-1"
              >
                {formatPrice(merchandise.price.amount)}
              </p>
            </div>
          </div>

          <div>
            <Label className="text-sm font-semibold uppercase text-[#211D1F] mb-3 block">
              Quantity
            </Label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span
                style={{ fontFamily: "var(--font-rozha)" }}
                className="text-2xl font-normal w-12 text-center text-[#211D1F]"
              >
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <hr className="border-dashed" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <Label
                  htmlFor="cake-wording"
                  className="text-sm font-semibold uppercase text-[#211D1F] block"
                >
                  Add Cake Wording
                </Label>
                <p className="text-xs text-[#211D1F]/70 mt-1">
                  Optional - max. 50 characters
                </p>
              </div>
              <Checkbox
                id="cake-wording"
                checked={hasCakeWording}
                onCheckedChange={(checked) =>
                  setHasCakeWording(checked as boolean)
                }
                className="w-6 h-6 border-2 border-[#211D1F]"
              />
            </div>
            {hasCakeWording && (
              <Input
                type="text"
                value={cakeWording}
                onChange={(e) => setCakeWording(e.target.value)}
                placeholder="Enter cake wording"
                maxLength={50}
                className="w-full"
              />
            )}
          </div>

          <hr className="border-dashed" />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <Label
                  htmlFor="greeting"
                  className="text-sm font-semibold uppercase text-[#211D1F] block"
                >
                  Add Greeting Card
                </Label>
                <p className="text-xs text-[#211D1F]/70 mt-1">
                  Optional - max. 100 characters
                </p>
              </div>
              <Checkbox
                id="greeting"
                checked={hasGreeting}
                onCheckedChange={(checked) =>
                  setHasGreeting(checked as boolean)
                }
                className="w-6 h-6 border-2 border-[#211D1F]"
              />
            </div>
            {hasGreeting && (
              <Input
                type="text"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                placeholder="Enter greeting message"
                maxLength={100}
                className="w-full"
              />
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[#211D1F] bg-white p-6">
        <Button
          onClick={handleSave}
          className="w-full bg-[#5a6e3a] hover:bg-[#4a5e2a] text-white py-6 uppercase font-semibold"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default CartEdit;
