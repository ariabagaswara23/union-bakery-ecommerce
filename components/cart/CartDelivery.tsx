"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DrawerHeader, DrawerTitle } from "../ui/drawer";
import { Calendar } from "lucide-react";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format, parse } from "date-fns";
import { useCheckout } from "@/hooks/useCheckout";
import { getCartId } from "@/hooks/useCart";
import { useAlert } from "@/contexts/AlertContext";

interface CartDeliveryProps {
  onBack: () => void;
  onSuccess?: () => void;
  initialData?: {
    deliveryDate: string;
    deliveryTime: string;
    phone: string;
  } | null;
}

const CartDelivery = ({
  onBack,
  onSuccess,
  initialData,
}: CartDeliveryProps) => {
  const checkout = useCheckout();
  const { showAlert } = useAlert();

  const [openDate, setOpenDate] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(
    initialData?.deliveryDate
      ? parse(initialData.deliveryDate, "yyyy-MM-dd", new Date())
      : undefined
  );
  const [deliveryTime, setDeliveryTime] = useState<string>(
    initialData?.deliveryTime || ""
  );
  const [phone, setPhone] = useState<string>(initialData?.phone || "");

  const timeSlots = ["11AM - 2PM", "3PM - 5PM", "6PM - 8PM"];

  useEffect(() => {
    if (initialData) {
      showAlert(
        "info",
        "Your delivery details have been restored. Please review and checkout."
      );
    }
  }, [initialData]);

  const handleProceed = () => {
    if (!deliveryDate || !deliveryTime || !phone) {
      showAlert("error", "Please fill in all required fields");
      return;
    }

    if (phone.length < 10) {
      showAlert("error", "Please enter a valid phone number (min 10 digits)");
      return;
    }

    const cartId = getCartId();
    const accessToken = localStorage.getItem("accessToken");

    if (!cartId) {
      showAlert("error", "Cart not found");
      return;
    }

    if (!accessToken) {
      showAlert("warning", "Please login to complete checkout");

      localStorage.setItem(
        "pendingCheckout",
        JSON.stringify({
          deliveryDate: format(deliveryDate, "yyyy-MM-dd"),
          deliveryTime,
          phone,
          step: "delivery",
          timestamp: Date.now(),
        })
      );

      localStorage.setItem("shouldAutoJump", "true");

      localStorage.setItem("checkoutReturnUrl", window.location.pathname);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }

    const checkoutInput = {
      cartId,
      phone,
      deliveryDate: format(deliveryDate, "yyyy-MM-dd"),
      deliveryTime,
    };

    checkout.mutate(
      { input: checkoutInput, accessToken },
      {
        onSuccess: (data) => {
          showAlert("success", data.data.message || "Checkout successful!");

          localStorage.removeItem("pendingCheckout");
          localStorage.removeItem("shouldAutoJump");

          setTimeout(() => {
            if (onSuccess) {
              onSuccess();
            }
          }, 1500);
        },
        onError: (error) => {
          showAlert("error", error.message);
        },
      }
    );
  };

  const isFormValid = deliveryDate && deliveryTime && phone.length >= 10;

  return (
    <>
      <div className="flex flex-col h-full z-10">
        <DrawerHeader className="border-b ">
          <DrawerTitle
            onClick={onBack}
            className="text-sm font-semibold text-[#3F4B1F] uppercase"
          >
            Back
          </DrawerTitle>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-6 ">
          <div className="space-y-6">
            <div>
              <Label
                htmlFor="delivery-date"
                className="text-sm font-semibold uppercase text-[#211D1F] mb-2 block"
              >
                Delivery Date
              </Label>
              <Popover open={openDate} onOpenChange={setOpenDate}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between text-left font-normal bg-transparent text-[#211D1F] hover:text-[#211D1F]/90 focus:text-[#211D1F] border border-[#211D1F]/70"
                  >
                    {deliveryDate ? format(deliveryDate, "PPP") : "Pick a date"}
                    <Calendar className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 z-100 bg-white"
                  align="start"
                >
                  <CalendarComponent
                    mode="single"
                    selected={deliveryDate}
                    onSelect={(newDate) => {
                      setDeliveryDate(newDate);
                      setOpenDate(false);
                    }}
                    className="text-[#211D1F] hover:text-[#211D1F]/90 z-[999]"
                    disabled={{ before: new Date() }}
                    initialFocus
                    modifiersClassNames={{
                      selected: "bg-[#5a6e3a] text-white hover:bg-[#4a5e2a]",
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {deliveryDate && (
              <div>
                <Label
                  htmlFor="delivery-time"
                  className="text-sm font-semibold uppercase text-[#211D1F] mb-2 block"
                >
                  Delivery Time
                </Label>
                <Select value={deliveryTime} onValueChange={setDeliveryTime}>
                  <SelectTrigger className="w-full bg-transparent text-[#211D1F] border border-[#211D1F]/70">
                    <SelectValue placeholder="3PM - 5PM" />
                  </SelectTrigger>
                  <SelectContent className="z-99 bg-white">
                    {timeSlots.map((slot) => (
                      <SelectItem
                        key={slot}
                        value={slot}
                        className="text-[#211D1F] data-[state=checked]:bg-[#661419] data-[state=checked]:text-white focus:bg-[#661419]/10"
                      >
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {deliveryTime && (
              <div>
                <Label
                  htmlFor="phone"
                  className="text-sm font-semibold uppercase text-[#211D1F] mb-2 block"
                >
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Input phone number"
                  className="w-full text-[#211D1F] border border-[#211D1F]/70 bg-transparent"
                />
                <p className="text-xs text-[#211D1F]/70 mt-2">
                  Enter your phone number or your U+Rewards phone number to earn
                  U+ points on this order.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-[#211D1F] bg-white p-6">
          <Button
            onClick={handleProceed}
            disabled={!isFormValid || checkout.isPending}
            className="w-full bg-[#3F4B1F] hover:bg-[#8b9876] disabled:bg-gray-300 text-white py-6 uppercase font-semibold"
          >
            {checkout.isPending ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing...
              </div>
            ) : (
              "Proceed to Checkout"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartDelivery;
