"use client";

import Error from "next/error";

export default function NotFound() {
  console.log(`here`);

  return (
    <html suppressHydrationWarning lang="en">
      <body className="antialiased bg-white dark:dark-background text-slate-900 dark:text-slate-50 min-page-screen">
        <Error statusCode={404} />
      </body>
    </html>
  );
}
