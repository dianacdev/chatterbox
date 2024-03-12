import type { Metadata } from "next";
import { Archivo } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";

import { cn } from "@/lib/utils";
import "./globals.css";

const font = Archivo({ subsets: ["latin"] });

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
            font.className,
            "bg-[#F8F8FF] dark:bg-[#313338]"
          )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system" //change dark to system once completed
            enableSystem={true}
            storageKey="chatterbox-theme"
          >
            <ModalProvider/>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
