import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import LayoutProvider from "@/layout-provider";

export const metadata: Metadata = {
  title: "Beauty Salon and Spa",
  description: "A modern and luxurious spa experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutProvider>
            {children}
        </LayoutProvider>
        <Toaster />
      </body>
    </html>
  );
}
