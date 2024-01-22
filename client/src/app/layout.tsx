import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import GlobalStateProvider from "@/redux/GlobalStateProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ink Fusion",
  description: "Free collaborative drawing web applicaiton",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-background")}>
        <GlobalStateProvider>{children}</GlobalStateProvider>
      </body>
    </html>
  );
}
