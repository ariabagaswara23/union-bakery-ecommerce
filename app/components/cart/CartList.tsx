import React from "react";
import { DrawerClose, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";
import { ShoppingCart, X } from "lucide-react";
import CartItem from "./CartItem";

interface CartListProps {
  cartItems: any[];
  onEdit: (id: string) => void;
}

const CartList = ({ cartItems, onEdit }: CartListProps) => {
  const handleQuantityChange = (id: string, newQuantity: number) => {
    console.log(`Update item ${id} to quantity ${newQuantity}`);
    // Add your cart update API call here
  };

  const handleRemove = (id: string) => {
    console.log(`Remove item ${id}`);
    // Add your remove API call here
  };

  return (
    <div className="flex flex-col h-full z-10">
      {/* Header */}
      <DrawerHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <DrawerTitle className="text-2xl font-bold text-[#211D1F]">
              CART
            </DrawerTitle>
            <p
              style={{ fontFamily: "var(--font-eb-garamond)" }}
              className="font-normal text-sm text-black/50 italic"
            >
              *All prices shown are in thousands of rupiah
            </p>
          </div>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <X className="w-6! h-6! text-[#211D1F]" />
            </Button>
          </DrawerClose>
        </div>
      </DrawerHeader>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6">
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemove}
                onEdit={onEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartList;
