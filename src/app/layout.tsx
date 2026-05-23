import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { OrderProvider } from "@/lib/context/OrderContext";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});



export const metadata: Metadata = {
  title: "ClienHub | Premium Client Portal",
  description: "The professional client dashboard for agencies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <OrderProvider>
          {children}
          <Toaster position="top-right" />
        </OrderProvider>
      </body>
    </html>
  );
}
