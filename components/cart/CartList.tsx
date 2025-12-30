"use client";
import React, { useState } from "react";
import { DrawerClose, DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Button } from "../ui/button";
import { CheckCircle2, ShoppingCart, X, XCircle } from "lucide-react";
import CartItem from "./CartItem";
import { getCartId, useRemoveCartLine } from "@/hooks/useCart";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface CartListProps {
  cartItems: any[];
  onEdit: (id: string) => void;
  isLoading: boolean;
  isError: boolean;
}

const CartList = ({ cartItems, onEdit, isLoading, isError }: CartListProps) => {
  const removeCartLine = useRemoveCartLine();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    lineId: string;
    productTitle?: string;
  } | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    type: "success" | "error";
    message: string;
  }>({
    show: false,
    type: "success",
    message: "",
  });

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ show: true, type, message });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, type: "success", message: "" });
    }, 3000);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-white/95 backdrop-blur-sm">
        <DrawerHeader className="border-b border-[#211D1F]">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-2xl font-bold text-[#211D1F]">
              CART
            </DrawerTitle>
            <DrawerClose>
              <X className="w-6 h-6 text-[#211D1F]" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3F4B1F] mx-auto mb-4"></div>
            <p className="text-[#211D1F]">Loading cart...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleRemoveClick = (lineId: string, productTitle?: string) => {
    setItemToDelete({ lineId, productTitle });
    setShowDeleteDialog(true);
  };

  const handleConfirmRemove = () => {
    if (!itemToDelete) return;

    const cartId = getCartId();

    if (!cartId) {
      showNotification("error", "Cart not found");
      setShowDeleteDialog(false);
      return;
    }

    // Call API to remove
    removeCartLine.mutate(
      {
        cartId,
        lineIds: itemToDelete.lineId,
      },
      {
        onSuccess: () => {
          const message = itemToDelete.productTitle
            ? `${itemToDelete.productTitle} has been removed from cart`
            : "Item has been removed from cart";

          showNotification("success", message);
          setShowDeleteDialog(false);
          setItemToDelete(null);
        },
        onError: (error) => {
          showNotification("error", `Failed to remove: ${error.message}`);
          setShowDeleteDialog(false);
          setItemToDelete(null);
        },
      }
    );
  };

  const handleCancelRemove = () => {
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };

  const handleRemove = (id: string) => {
    console.log(`Remove item ${id}`);
    // Add your remove API call here
  };

  if (isError) {
    return (
      <div className="flex flex-col h-full bg-white/95 backdrop-blur-sm">
        <DrawerHeader className="border-b border-[#211D1F]">
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-2xl font-bold text-[#211D1F]">
              CART
            </DrawerTitle>
            <DrawerClose>
              <X className="w-6 h-6 text-[#211D1F]" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-red-600">
            <p>Failed to load cart</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-sm underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col h-full  backdrop-blur-sm">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <DrawerTitle className="text-2xl font-bold text-[#211D1F]">
              CART
            </DrawerTitle>
            <DrawerClose>
              <X className="w-6 h-6 text-[#211D1F]" />
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-[#211D1F] font-medium mb-2">
              Your cart is empty
            </p>
            <p className="text-sm text-[#211D1F]/70">
              Add some delicious cakes to get started!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
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
        {notification.show && (
          <div className="px-6 pt-4">
            <Alert
              variant={
                notification.type === "error" ? "destructive" : "default"
              }
              className={
                notification.type === "success"
                  ? "border-green-600 bg-green-50 z-99"
                  : ""
              }
            >
              {notification.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertTitle className="text-[#211D1F]">
                {notification.type === "success" ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription className="text-[#211D1F]">
                {notification.message}
              </AlertDescription>
            </Alert>
          </div>
        )}
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
                  onRemove={() =>
                    handleRemoveClick(item.id, item.merchandise.product?.title)
                  }
                  onEdit={onEdit}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* AlertDialog for confirmation */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="z-99 bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#211D1F] font-semibold">
              Remove item from cart?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#211D1F]/90">
              {itemToDelete?.productTitle
                ? `Are you sure you want to remove "${itemToDelete.productTitle}" from your cart?`
                : "Are you sure you want to remove this item from your cart?"}{" "}
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleCancelRemove}
              className="bg-[#3F4B1F]!"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmRemove}
              className="bg-red-600 hover:bg-red-700"
              disabled={removeCartLine.isPending}
            >
              {removeCartLine.isPending ? "Removing..." : "Remove"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CartList;
