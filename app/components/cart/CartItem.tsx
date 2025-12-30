import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { CartLineNode } from "../../types/cart";

interface CartItemProps {
  item: CartLineNode;
  onQuantityChange?: (id: string, newQuantity: number) => void;
  onRemove?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const CartItem = ({
  item,
  onQuantityChange,
  onRemove,
  onEdit,
}: CartItemProps) => {
  const { id, quantity, attributes, merchandise } = item;

  const cakeSize =
    attributes.find((attr) => attr.key === "cakesize")?.value || "18cm";

  // const displayAttributes = attributes
  //   .filter((attr) => attr.value && !attr.key.toLowerCase().includes("size"))
  //   .map((attr) => `${attr.key}: ${attr.value}`)
  //   .join(", ");

  const handleDecrease = () => {
    if (quantity > 1 && onQuantityChange) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (onQuantityChange) {
      onQuantityChange(id, quantity + 1);
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(id);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(id);
    }
  };

  const formatPrice = (amount: string) => {
    return Math.round(parseFloat(amount) / 1000);
  };

  return (
    <div className="border-b border-dashed border-gray-300 rounded p-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={merchandise.image.url}
            alt={merchandise.product?.title || "Product"}
            fill
            className="object-cover rounded"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-sm uppercase text-[#211D1F]">
                {merchandise.product?.title || "Product"}
              </h3>
              <p className="text-xs text-gray-600">{cakeSize}</p>
              {/* {displayAttributes && (
                <p className="text-xs text-gray-600 mt-1">
                  {displayAttributes}
                </p>
              )} */}
            </div>
            <p
              style={{ fontFamily: "var(--font-rozha)" }}
              className="font-normal text-base text-[#661419]"
            >
              {formatPrice(merchandise.price.amount)}
            </p>
          </div>

          {/* Quantity Controls */}
          {/* <div className="flex items-center gap-3 mb-2">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6 rounded-full"
              onClick={handleIncrease}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div> */}
          <div className="flex mt-4 items-center justify-between">
            <span
              style={{ fontFamily: "var(--font-rozha)" }}
              className="text-base font-normal w-6 text-center text-[#211D1F]"
            >
              {quantity}
              <span style={{ fontFamily: "var(--font-montserrat)" }}>x</span>
            </span>
            <div className="flex gap-4 text-xs">
              <button
                onClick={handleEdit}
                className="text-[#211D1F] text-sm hover:text-black font-semibold uppercase"
              >
                Edit
              </button>
              <button
                onClick={handleRemove}
                className="text-[#211D1F] text-sm hover:text-red-600 font-semibold uppercase"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
