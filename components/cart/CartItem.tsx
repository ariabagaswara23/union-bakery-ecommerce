import React from "react";
import Image from "next/image";
import { CartLineNode } from "../../types/cart";

interface CartItemProps {
  item: CartLineNode;
  onRemove?: (id: string) => void;
  onEdit?: (id: string) => void;
}

const CartItem = ({ item, onRemove, onEdit }: CartItemProps) => {
  const { id, quantity, attributes, merchandise, cakeSize } = item;

  const cakeWording = attributes.find((attr) =>
    attr.key.toLowerCase().includes("cake wording")
  )?.value;

  const greeting = attributes.find((attr) =>
    attr.key.toLowerCase().includes("greeting")
  )?.value;

  let displayText = cakeSize;
  if (!displayText?.includes("cm") && displayText !== "SLICE") {
    displayText += "cm";
  }
  if (cakeWording) displayText += " with cake wording";
  if (greeting) displayText += " with greeting";

  const productTitle = merchandise.product?.title || "Product";

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

  const formatPrice = (amount: string | number) => {
    return Math.round(parseFloat(amount.toString()) / 1000);
  };

  return (
    <div className="border-b border-dashed border-gray-300 rounded p-4">
      <div className="flex gap-4">
        <div className="relative w-20 h-20 shrink-0">
          <Image
            src={merchandise.image.url}
            alt={productTitle || "Product"}
            fill
            className="object-cover rounded"
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-sm uppercase text-[#211D1F]">
                {productTitle}
              </h3>
              <p className="text-xs text-gray-600">{displayText}</p>
            </div>
            <p
              style={{ fontFamily: "var(--font-rozha)" }}
              className="font-normal text-base text-[#661419]"
            >
              {formatPrice(parseFloat(merchandise.price.amount) * quantity)}
            </p>
          </div>

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
