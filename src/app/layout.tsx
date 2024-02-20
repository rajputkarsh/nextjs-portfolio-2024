import { Inter } from "next/font/google";
import TransitionProvider from "@/wrappers/TransitionProvider";
import "@/styles/index.scss";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={`overflow-x-hidden ${inter.className}`}>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
