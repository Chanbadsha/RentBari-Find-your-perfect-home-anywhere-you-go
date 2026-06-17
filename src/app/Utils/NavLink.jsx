"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink = ({ navItem }) => {
  const pathName = usePathname();
  const isActive = pathName === navItem?.path;
  return (
    <li>
      <Link
        className={`${isActive ? "bg-primary text-background " : ""} hover:bg-primary ease-in-out hover:shadow-sm hover:text-background px-4 py-2 rounded-lg font-semibold duration-300  transition-all  `}
        href={`${navItem?.path}`}
      >
        {navItem?.label}
      </Link>
    </li>
  );
};

export default NavLink;
