"use client";

import { links, listItemVariants } from "@/constants/navbar";
import { motion } from "framer-motion";
import Link from "next/link";

interface NavLinkProps {
  link: (typeof links)[number];
  mobile?: boolean;
}

const NavLink = ({ link, mobile = false }: NavLinkProps) => {
  if (mobile) {
    return (
      <motion.div variants={listItemVariants} className="" key={link.title}>
        <Link target={link.redirectNewTab ? "_blank" : "_self"} href={link.url}>
          {link.title}
        </Link>
      </motion.div>
    );
  }

  return (
    <Link
      className={`rounded p-1 transition-colors duration-300 hover:bg-${link.hoverColor} hover:text-${link.textColor}`}
      href={link.url}
      target={link.redirectNewTab ? "_blank" : "_self"}
    >
      {link.title}
    </Link>
  );
};

export default NavLink;