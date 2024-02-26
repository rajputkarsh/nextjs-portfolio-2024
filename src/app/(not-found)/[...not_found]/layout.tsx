import { Inter } from "next/font/google";
import TransitionProvider from "@/wrappers/TransitionProvider";
import "@/styles/index.scss";
import "@/app/globals.scss";
import { Metadata } from "next";

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
      <body className={`overflow-x-hidden ${inter.className}`}>
        <TransitionProvider noNavbar={true}>{children}</TransitionProvider>
      </body>
    </html>
  );
}
