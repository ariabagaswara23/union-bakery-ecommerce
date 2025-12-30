"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const LoginPage = () => {
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
                RETURNING CUSTOMERS
              </CardTitle>
              <CardDescription className="text-base font-normal text-[#211D1F]">
                If you already have an account, please log in to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  Password
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#211D1F]/70 hover:text-[#211D1F]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeClosed /> : <Eye />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-sm font-bold hover:underline text-[#3F4B1F]"
                >
                  FORGOT PASSWORD
                </a>
              </div>

              <Button className="w-full bg-[#5a6e3a] hover:bg-[#4a5e2a] text-white py-6 text-base font-semibold uppercase">
                Login
              </Button>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-2xl text-[#211D1F] font-bold uppercase">
                NEW CUSTOMERS
              </CardTitle>
              <CardDescription className="text-base font-normal text-[#211D1F]">
                Create an account for seamless checkout experience & access to
                your order history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-[#5a6e3a] hover:bg-[#4a5e2a] text-white py-6 text-base font-semibold uppercase">
                Register
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
