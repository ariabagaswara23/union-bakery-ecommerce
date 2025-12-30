"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/product/detail-background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="relative z-10 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-12">
            <Image
              src="/image/main-logo-black.png"
              alt="Union Bakery"
              width={150}
              height={60}
              className="object-contain"
            />
          </div>
          <Card className="mb-8 bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-[#211D1F] font-bold uppercase">
                NEW CUSTOMERS
              </CardTitle>
              <CardDescription className="text-base font-normal text-[#211D1F]">
                Create an account for seamless checkout experience & access to
                your order history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold uppercase mb-2 block text-[#211D1F]/70"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email"
                  className="w-full text-[#211D1F]"
                />
              </div>
              <div>
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold uppercase mb-2 block text-[#211D1F]/70"
                >
                  Create Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full text-[#211D1F]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#211D1F]/70 hover:text-[#211D1F]"
                  >
                    {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <p className="mb-1">Password must contain:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>8 characters</li>
                    <li>Upper and lower case</li>
                    <li>Number</li>
                  </ul>
                </div>
              </div>

              {/* First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="firstName"
                    className="text-sm font-semibold uppercase mb-2 block text-[#211D1F]/70"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter first name"
                    className="w-full text-[#211D1F]"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="lastName"
                    className="text-sm font-semibold uppercase mb-2 block text-[#211D1F]/70"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter last name"
                    className="w-full text-[#211D1F]"
                  />
                </div>
              </div>

              {/* Newsletter Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox id="newsletter" className="border-2 border-black" />
                <Label
                  htmlFor="newsletter"
                  className="text-sm cursor-pointer font-medium text-[#211D1F]"
                >
                  Send me latest info & promotions about Union Bakery
                </Label>
              </div>

              {/* Register Button */}
              <Button className="w-full bg-[#9ba886] hover:bg-[#8b9876] text-white py-6 text-base font-semibold uppercase">
                Register
              </Button>

              {/* Terms */}
              <p className="text-center text-sm text-gray-600">
                By signing up, you agree to our{" "}
                <a
                  href="/terms"
                  className="font-semibold text-black hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="font-semibold text-black hover:underline"
                >
                  Privacy Policy
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
