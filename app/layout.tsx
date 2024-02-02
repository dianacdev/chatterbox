import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

const inter = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatterBox",
  description: "Encrypted Chat Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
