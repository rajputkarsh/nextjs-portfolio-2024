"use client";

import { links } from "@/constants/navlink";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  link: (typeof links)[number];
}

const NavLink = ({ link }: NavLinkProps) => {
  const pathName = usePathname();

  return (
    <Link
      className={`rounded p-1 hover:bg-${link.bgColor} hover:text-${link.textColor}`}
      href={link.url}
      target={link.redirectNewTab ? "_blank" : "_self"}
    >
      {link.title}
    </Link>
  );
};

export default NavLink;
