import type { Metadata } from "next";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Login - Union Bakery Ecommerce",
  description: "Your one-stop shop for delicious baked goods and treats.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
      <Footer />
    </div>
  );
}
