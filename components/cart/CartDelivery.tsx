"use client";

import React, { useState } from "react";
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
import { ArrowLeft, Calendar } from "lucide-react";
import { Calendar as CalendarComponent } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";

interface CartDeliveryProps {
  onBack: () => void;
  onProceed: (deliveryData: {
    date: Date | undefined;
    time: string;
    phone: string;
  }) => void;
}

const CartDelivery = ({ onBack, onProceed }: CartDeliveryProps) => {
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const timeSlots = ["11AM - 2PM", "3PM - 5PM", "6PM - 8PM"];

  const handleProceed = () => {
    onProceed({ date, time, phone });
  };

  const isFormValid = date && time && phone.length >= 10;

  return (
    <div className="flex flex-col h-full z-10">
      {/* Header */}
      <DrawerHeader className="border-b ">
        <DrawerTitle
          onClick={onBack}
          className="text-sm font-semibold text-[#3F4B1F] uppercase"
        >
          Back
        </DrawerTitle>
      </DrawerHeader>

      {/* Delivery Form */}
      <div className="flex-1 overflow-y-auto p-6 ">
        <div className="space-y-6">
          {/* Delivery Date */}
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
                  className="w-full justify-between text-left font-normal bg-transparent text-[#211D1F] border border-[#211D1F]/70"
                >
                  {date ? format(date, "PPP") : "Pick a date"}
                  <Calendar className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 z-100 bg-white"
                align="start"
              >
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setOpenDate(false); // Close popover after selecting
                  }}
                  className="text-[#211D1F] z-[999]"
                  disabled={{ before: new Date() }}
                  initialFocus
                  modifiersClassNames={{
                    selected: "bg-[#5a6e3a] text-white hover:bg-[#4a5e2a]",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Delivery Time - Only show if date is selected */}
          {date && (
            <div>
              <Label
                htmlFor="delivery-time"
                className="text-sm font-semibold uppercase text-[#211D1F] mb-2 block"
              >
                Delivery Time
              </Label>
              <Select value={time} onValueChange={setTime}>
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

          {/* Phone Number - Only show if time is selected */}
          {time && (
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

      {/* Footer */}
      <div className="border-t border-[#211D1F] bg-white p-6">
        <Button
          onClick={handleProceed}
          disabled={!isFormValid}
          className="w-full bg-[#3F4B1F] hover:bg-[#8b9876] disabled:bg-gray-300 text-white py-6 uppercase font-semibold"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartDelivery;
