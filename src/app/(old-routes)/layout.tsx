import { Inter } from "next/font/google";
import TransitionProvider from "@/wrappers/TransitionProvider";
import Analytics from "@/components/analytics";
import { metadataObject } from "@/constants/common";

import "@/styles/index.scss";
import "@/app/globals.scss";
import Header from "@/components/header";
import { Metadata } from "next";
import ThemeButton from "@/components/themeButton";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = { ...metadataObject };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Header />
        <Analytics />
      </head>
      <body className={`overflow-x-hidden ${inter.className}`}>
        <ThemeButton />
        <TransitionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
