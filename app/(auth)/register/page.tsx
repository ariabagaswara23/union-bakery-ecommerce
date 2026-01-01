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
import { AlertCircle, Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/useAuth";
import { Alert, AlertDescription } from "@/components/ui/alert";

const RegisterPage = () => {
  const router = useRouter();
  const register = useRegister();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState("");

  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isPasswordValid =
    hasMinLength && hasUpperCase && hasLowerCase && hasNumber;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !firstName || !lastName) {
      setError("Please fill in all required fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (!isPasswordValid) {
      setError("Password must meet all requirements");
      return;
    }

    register.mutate(
      {
        email,
        password,
        firstName: firstName,
        lastName: lastName,
      },
      {
        onSuccess: () => {
          const returnUrl = localStorage.getItem("checkoutReturnUrl") || "/";
          localStorage.removeItem("checkoutReturnUrl");

          setTimeout(() => {
            window.location.href = returnUrl;
          }, 1000);
        },
        onError: (error) => {
          setError(error.message);
        },
      }
    );
  };

  const handleRedirectToLandingPage = () => {
    router.push("/");
  };

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
              onClick={handleRedirectToLandingPage}
            />
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-6">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={register.isPending}
                    required
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={register.isPending}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#211D1F]/70 hover:text-[#211D1F]"
                    >
                      {showPassword ? (
                        <EyeClosed size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">
                    <p className="mb-1">Password must contain:</p>
                    <ul className="space-y-1">
                      <li className={hasMinLength ? "text-green-600" : ""}>
                        {hasMinLength ? "✓" : "•"} 8 characters
                      </li>
                      <li
                        className={
                          hasUpperCase && hasLowerCase ? "text-green-600" : ""
                        }
                      >
                        {hasUpperCase && hasLowerCase ? "✓" : "•"} Upper and
                        lower case
                      </li>
                      <li className={hasNumber ? "text-green-600" : ""}>
                        {hasNumber ? "✓" : "•"} Number
                      </li>
                    </ul>
                  </div>
                </div>

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
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={register.isPending}
                      required
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
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={register.isPending}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="newsletter"
                    className="border-2 border-black text-[#211D1F]"
                    checked={newsletter}
                    onCheckedChange={(checked) =>
                      setNewsletter(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="newsletter"
                    className="text-sm cursor-pointer font-medium text-[#211D1F]"
                  >
                    Send me latest info & promotions about Union Bakery
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={register.isPending}
                  className="w-full bg-[#3F4B1F] hover:bg-[#8b9876] text-white py-6 text-base font-semibold uppercase disabled:bg-[#3F4B1F]/50"
                >
                  {register.isPending ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Creating account...
                    </div>
                  ) : (
                    "Register"
                  )}
                </Button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
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
