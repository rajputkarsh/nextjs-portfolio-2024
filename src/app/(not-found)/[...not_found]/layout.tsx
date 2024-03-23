import Header from "@/components/header";
import Analytics from "@/components/analytics";
import TransitionProvider from "@/wrappers/TransitionProvider";
import { Inter } from "next/font/google";
import { metadataObject } from "@/constants/common";
import { Metadata } from "next";

import "@/styles/index.scss";
import "@/app/globals.scss";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...metadataObject,
  title: `Not Found | ${metadataObject.title}`,
};

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
        <TransitionProvider noNavbar={true}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
