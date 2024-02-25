"use client";

import config from "@/constants/config";

function Footer() {
  return (
    <footer className="text-md font-semibold mt-12 mb-2 flex  flex-row justify-center ">
      Made with
      <span className="px-1">❤️</span>
      by
      <span className="text-theme-color pl-1">{config.title}</span>
    </footer>
  );
}

export default Footer;
