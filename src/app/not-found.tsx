import Error from "next/error";

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="antialiased bg-white dark:dark-background text-slate-900 dark:text-slate-50 min-page-screen">
        <Error statusCode={404} />
      </body>
    </html>
  );
}
