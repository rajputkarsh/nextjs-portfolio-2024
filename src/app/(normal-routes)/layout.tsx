import { Inter } from "next/font/google";
import TransitionProvider from "@/wrappers/TransitionProvider";
import Analytics from "@/components/analytics";
import { Metadata } from "next";

import "@/styles/index.scss";
import "@/app/globals.scss";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Utkarsh Rajput: Full Stack Developer",
  description:
    "Utkarsh: Full Stack Developer - Typescript, ReactJS, NodeJS, NextJS, MongoDB, PostgreSQL, MERN Stack",
  generator: "Utkarsh Rajput",
  applicationName: "Utkarsh Rajput",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Utkarsh",
    "React",
    "JavaScript",
    "Typescript",
    "ReactJS",
    "NodeJS",
    "NextJS",
    "MongoDB",
    "PostgreSQL",
    "MERN Stack",
  ],
  authors: [{ name: "Utkarsh" }],
  creator: "Utkarsh",
  publisher: "Utkarsh",

  openGraph: {
    title: "Utkarsh Rajput: Full Stack Developer",
    description:
      "Utkarsh: Full Stack Developer - Typescript, ReactJS, NodeJS, NextJS, MongoDB, PostgreSQL, MERN Stack",
    url: "https://utkarshrajput.com",
  },
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
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
