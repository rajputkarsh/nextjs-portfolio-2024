import { Inter } from "next/font/google";
import Script from "next/script";
import TransitionProvider from "@/wrappers/TransitionProvider";
import "@/styles/index.scss";
import "@/app/globals.scss";

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
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID}`}
        />
        <Script id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${"${process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID}"}');
          `}
        </Script>
      </head>
      <body className={`overflow-x-hidden ${inter.className}`}>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
