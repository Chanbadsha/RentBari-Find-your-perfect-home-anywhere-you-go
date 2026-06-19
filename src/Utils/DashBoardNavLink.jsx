"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DashBoardNavLink = ({ navItem }) => {
  const pathname = usePathname();

  const isActive =
    pathname === navItem.path || pathname.startsWith(navItem.path + "/");

  return (
    <li>
      <Link
        href={navItem.path}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
          isActive
            ? "bg-primary text-white shadow-md"
            : "text-gray-600 hover:bg-primary hover:text-white"
        }`}
      >
        <span className="text-lg">{navItem.icon}</span>
        <span>{navItem.label}</span>
      </Link>
    </li>
  );
};

export default DashBoardNavLink;
