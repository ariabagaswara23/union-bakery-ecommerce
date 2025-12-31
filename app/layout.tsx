import type { Metadata } from "next";
import { Montserrat, Rozha_One, EB_Garamond } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProviders";
import { AlertProvider } from "@/contexts/AlertContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const rozhaOne = Rozha_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rozha",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Union Bakery Ecommerce",
  description: "Your one-stop shop for delicious baked goods and treats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${rozhaOne.variable} ${ebGaramond.variable}`}
      suppressHydrationWarning
    >
      <body className={montserrat.className}>
        <QueryProvider>
          <AlertProvider>{children}</AlertProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
