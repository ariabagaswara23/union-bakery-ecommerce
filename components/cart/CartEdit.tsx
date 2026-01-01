"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Minus, Plus } from "lucide-react";
import { CartLineNode } from "../../types/cart";
import { useUpdateCartLine, getCartId } from "@/hooks/useCart";
import { useAlert } from "@/contexts/AlertContext";

interface CartEditProps {
  item: CartLineNode & {
    cakeSize?: string;
  };
  onBack: () => void;
}

const CartEdit = ({ item, onBack }: CartEditProps) => {
  const { id, quantity: initialQuantity, attributes, merchandise } = item;
  const updateCartLine = useUpdateCartLine();
  const { showAlert } = useAlert();

  const initialCakeWording =
    attributes.find((attr) => attr.key.toLowerCase().includes("cake wording"))
      ?.value || "";
  const initialGreeting =
    attributes.find((attr) => attr.key.toLowerCase().includes("greeting"))
      ?.value || "";

  const [quantity, setQuantity] = useState(initialQuantity);
  const [hasCakeWording, setHasCakeWording] = useState(!!initialCakeWording);
  const [cakeWording, setCakeWording] = useState(initialCakeWording);
  const [hasGreeting, setHasGreeting] = useState(!!initialGreeting);
  const [greeting, setGreeting] = useState(initialGreeting);

  const formatPrice = (amount: string | number) => {
    return Math.round(parseFloat(amount.toString()) / 1000);
  };

  const handleSave = () => {
    const cartId = getCartId();

    if (!cartId) {
      showAlert("error", "Cart ID not found");
      return;
    }

    const updateInput = {
      cartId,
      lineId: id,
      quantity,
      cakeWording: hasCakeWording ? cakeWording : undefined,
      greetingWording: hasGreeting ? greeting : undefined,
    };

    updateCartLine.mutate(updateInput, {
      onSuccess: () => {
        showAlert("success", "Cart item has been updated");

        setTimeout(() => {
          onBack();
        }, 1000);
      },
      onError: (error) => {
        showAlert("error", error.message);
      },
    });
  };

  return (
    <div className="flex flex-col h-full z-10">
      <DrawerHeader className="border-b shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          disabled={updateCartLine.isPending}
          className="flex-shrink-0 uppercase text-sm font-semibold text-[#3F4B1F]"
        >
          Back
        </Button>
        <DrawerTitle className="text-2xl font-bold text-[#211D1F] uppercase">
          {merchandise.product?.title || "Product"}
        </DrawerTitle>
        <hr className="text-[#211D1F]" />
      </DrawerHeader>

      <div className="flex-1 overflow-y-auto px-6 pb-32 md:pb-6">
        <div className="space-y-3 py-4">
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
                className="w-6 h-6 border-2 border-[#211D1F] text-[#211D1F]"
              />
            </div>
            {hasCakeWording && (
              <Input
                type="text"
                value={cakeWording}
                onChange={(e) => setCakeWording(e.target.value)}
                placeholder="Enter cake wording"
                maxLength={50}
                className="w-full text-[#211D1F] border border-[#211D1F]/70"
              />
            )}
          </div>

          <hr className="border-dashed text-[#211D1F]" />

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
                className="w-6 h-6 border-2 border-[#211D1F] text-[#211D1F]"
              />
            </div>
            {hasGreeting && (
              <Input
                type="text"
                value={greeting}
                onChange={(e) => setGreeting(e.target.value)}
                placeholder="Enter greeting message"
                maxLength={100}
                className="w-full text-[#211D1F] border border-[#211D1F]/70"
              />
            )}
          </div>

          <div className="flex justify-between items-center pt-3">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full bg-transparent border-[#BDBDBD] text-[#BDBDBD]"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1 || updateCartLine.isPending}
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
                className="h-6 w-6 rounded-full bg-transparent border-[#3F4B1F] text-[#3F4B1F]"
                onClick={() => setQuantity(quantity + 1)}
                disabled={updateCartLine.isPending}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="text-right">
              <p
                style={{ fontFamily: "var(--font-rozha)" }}
                className="font-normal text-xl text-[#661419]"
              >
                {formatPrice(parseFloat(merchandise.price.amount) * quantity)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#211D1F] bg-white p-6 shrink-0 sticky bottom-0 z-20">
        <Button
          onClick={handleSave}
          disabled={updateCartLine.isPending}
          className="w-full bg-[#5a6e3a] hover:bg-[#4a5e2a] text-white py-6 uppercase font-semibold"
        >
          {updateCartLine.isPending ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Updating...
            </div>
          ) : (
            "Update"
          )}
        </Button>
      </div>
    </div>
  );
};

export default CartEdit;
