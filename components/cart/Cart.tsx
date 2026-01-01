"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerFooter } from "../ui/drawer";
import { CartData } from "../../types/cart";
import CartList from "./CartList";
import { useEffect, useRef, useState } from "react";
import CartEdit from "./CartEdit";
import CartDelivery from "./CartDelivery";
import { useEnrichedCart } from "@/hooks/useCart";
import { isAuthenticated } from "@/lib/api/auth";
import { useAlert } from "@/contexts/AlertContext";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CartStep = "cart" | "edit" | "delivery";

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { cartItems, isLoading, isError, subtotal } = useEnrichedCart();
  const { showAlert } = useAlert();

  const formatPrice = (amount: number) => {
    return Math.round(amount / 1000);
  };

  const [currentStep, setCurrentStep] = useState<CartStep>("cart");
  const [editingItem, setEditingItem] = useState<any>(null);

  const [restoredDeliveryData, setRestoredDeliveryData] = useState<any>(null);

  const [hasAutoJumped, setHasAutoJumped] = useState(false);

  useEffect(() => {
    if (open && isAuthenticated()) {
      const pendingCheckout = localStorage.getItem("pendingCheckout");
      const shouldAutoJump = localStorage.getItem("shouldAutoJump");

      if (pendingCheckout) {
        try {
          const data = JSON.parse(pendingCheckout);

          // Check expiry of data (max 30 min)
          const MAX_AGE = 30 * 60 * 1000;
          const isExpired = Date.now() - data.timestamp > MAX_AGE;

          if (!isExpired && data.step === "delivery") {
            // Restore data
            setRestoredDeliveryData(data);

            if (shouldAutoJump === "true" && !hasAutoJumped) {
              setCurrentStep("delivery");
              setHasAutoJumped(true);

              // Clear auto-jump flag (one-time use)
              localStorage.removeItem("shouldAutoJump");
            }
          } else if (isExpired) {
            // Clear expired data
            localStorage.removeItem("pendingCheckout");
            localStorage.removeItem("shouldAutoJump");
          }
        } catch (error) {
          showAlert("error", `Failed to parse pending checkout: ${error}`);
          localStorage.removeItem("pendingCheckout");
          localStorage.removeItem("shouldAutoJump");
        }
      }
    }
  }, [open, hasAutoJumped]);

  useEffect(() => {
    if (!open) {
      setHasAutoJumped(false);
    }
  }, [open]);

  const handleEdit = (itemId: string) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (item) {
      setEditingItem(item);
      setCurrentStep("edit");
    }
  };

  const handleCheckoutSuccess = () => {
    localStorage.removeItem("pendingCheckout");
    localStorage.removeItem("shouldAutoJump");
    localStorage.removeItem("cartId");
    localStorage.removeItem("cart");
    localStorage.removeItem("cartAssociated");

    onOpenChange(false);
    setCurrentStep("cart");
    setRestoredDeliveryData(null);
    // window.location.href = "/";
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "cart":
        return (
          <CartList
            cartItems={cartItems}
            onEdit={handleEdit}
            isLoading={isLoading}
            isError={isError}
          />
        );
      case "edit":
        return (
          <CartEdit
            item={editingItem}
            onBack={() => {
              setCurrentStep("cart");
              setEditingItem(null);
            }}
          />
        );
      case "delivery":
        return (
          <CartDelivery
            onBack={() => {
              setCurrentStep("cart");
            }}
            onSuccess={handleCheckoutSuccess}
            initialData={restoredDeliveryData}
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
                  {formatPrice(subtotal)}
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
