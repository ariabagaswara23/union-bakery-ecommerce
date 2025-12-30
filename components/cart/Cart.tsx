"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import { CartData } from "../../types/cart";
import CartItem from "./CartItem";
import CartList from "./CartList";
import { useState } from "react";
import CartEdit from "./CartEdit";
import CartDelivery from "./CartDelivery";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cartData?: CartData;
}

type CartStep = "cart" | "edit" | "delivery";

export function CartDrawer({ open, onOpenChange, cartData }: CartDrawerProps) {
  const cartItems = cartData?.nodes || [];

  const [currentStep, setCurrentStep] = useState<CartStep>("cart");
  const [editingItem, setEditingItem] = useState<any>(null);

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.merchandise.price.amount) * item.quantity,
    0
  );

  const handleEdit = (id: string) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      setEditingItem(item);
      setCurrentStep("edit");
    }
  };

  const handleSaveEdit = (
    id: string,
    quantity: number,
    cakeWording: string,
    greeting: string
  ) => {
    console.log("Save edit:", { id, quantity, cakeWording, greeting });
    // Add your API call to update cart here
    setCurrentStep("cart");
    setEditingItem(null);
  };

  const handleProceedToCheckout = (deliveryData: any) => {
    console.log("Proceed to checkout with:", deliveryData);
    // Add your checkout logic here
    onOpenChange(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "cart":
        return <CartList cartItems={cartItems} onEdit={handleEdit} />;
      case "edit":
        return (
          <CartEdit
            item={editingItem}
            onBack={() => setCurrentStep("cart")}
            onSave={handleSaveEdit}
          />
        );
      case "delivery":
        return (
          <CartDelivery
            onBack={() => setCurrentStep("cart")}
            onProceed={handleProceedToCheckout}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="z-99 h-screen top-0 right-0 left-auto mt-0 !w-full md:w-[400px] rounded-none">
        <div className="absolute inset-0 z-0">
          <Image
            src="/image/product/detail-background.jpg"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        {renderStepContent()}
        {currentStep === "cart" && (
          <DrawerFooter className="border-t border-[#211D1F] bg-white z-10">
            <div className="space-y-4">
              <div className="flex justify-between text-sm font-medium text-[#211D1F]/70 items-center">
                <span className="uppercase">Subtotal</span>
                <span
                  style={{ fontFamily: "var(--font-rozha)" }}
                  className="text-[#661419] text-2xl font-normal"
                >
                  {Math.round(subtotal / 1000)}
                </span>
              </div>
              <Button
                className="w-full bg-[#5a6e3a] hover:bg-[#4a5e2a] text-white py-6 uppercase font-semibold"
                onClick={() => setCurrentStep("delivery")}
              >
                Choose Delivery Details
              </Button>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
