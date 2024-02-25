"use client";

import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { links, listItemVariants } from "@/constants/navbar";

interface NavLinkProps {
  link: (typeof links)[number];
  mobile?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NavLink = ({ link, setOpen, mobile = false }: NavLinkProps) => {
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
      className={`rounded p-1 transition-colors py-2 px-4 duration-300 hover:bg-${link.hoverColor} hover:text-${link.textColor}`}
      href={link.url}
      onClick={() => {
        setOpen(false);
      }}
      target={link.redirectNewTab ? "_blank" : "_self"}
    >
      {link.title}
    </Link>
  );
};

export default NavLink;
