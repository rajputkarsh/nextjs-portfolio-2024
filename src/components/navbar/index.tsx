"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import NavLink from "./Navlink";
import { motion } from "framer-motion";
import {
  bottomVariants,
  centerVariants,
  links,
  listVariants,
  topVariants,
} from "@/constants/navbar";
import config from "@/constants/config";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const renderResponsiveMenu = (): ReactNode => {
    return (
      <div className="md:hidden p-4">
        <button
          className="w-10 h-8 flex flex-col justify-between z-50 relative"
          onClick={() => setOpen((prev) => !prev)}
        >
          <motion.div
            variants={topVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded origin-left bg-theme-color"
          ></motion.div>
          <motion.div
            variants={centerVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded bg-theme-color"
          ></motion.div>
          <motion.div
            variants={bottomVariants}
            animate={open ? "opened" : "closed"}
            className="w-10 h-1 bg-black rounded origin-left bg-theme-color"
          ></motion.div>
        </button>

        {open && (
          <motion.div
            variants={listVariants}
            initial="closed"
            animate="opened"
            className="h-screen absolute top-0 left-0 w-screen h-screen bg-black text-white flex flex-col items-center justify-center gap-8 text-4xl z-40"
          >
            {links.map((link) => (
              <NavLink
                link={link}
                key={link.title}
                setOpen={setOpen}
                mobile={true}
              />
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="navbar w-screen h-full flex items-center justify-between text-xl xl:px-8 overflow-hidden drop-shadow-lg">
      <div className="lg:flex xl:w-1/3">
        <Link href="/" className="text-sm rounded-md p-4 font-semibold flex">
          <h2 className="text-theme-color text-3xl md:text-4xl mr-1">
            {`<${config.title.toUpperCase()} />`}
          </h2>
        </Link>
      </div>
      <div className="hidden md:flex gap-4">
        {links.map((link) => (
          <NavLink link={link} key={link.title} setOpen={setOpen} />
        ))}
      </div>

      {renderResponsiveMenu()}
    </div>
  );
};

export default Navbar;
