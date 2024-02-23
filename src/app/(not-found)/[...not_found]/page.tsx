"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col gap-8 justify-center items-center">
      <h3 className="text-4xl font-semibold underline-animation-black">
        Page Not Found
      </h3>
      <Link
        href="/"
        className="text-2xl rounded-2xl px-8 py-4 bg-theme-color text-white"
      >
        Return to Homepage
      </Link>
    </div>
  );
}
