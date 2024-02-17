import { Inter } from "next/font/google";
import TransitionProvider from "@/components/transitionProvider";
import "./globals.css";
import "@/styles/index.scss";

export const metadata = {
  title: "Utkarsh Rajput",
  description: "Utkarsh: MERN Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="antialiased bg-white dark:dark-background text-slate-900 dark:text-slate-50 min-page-screen">
        {children}
      </body>
    </html>
  );
}
