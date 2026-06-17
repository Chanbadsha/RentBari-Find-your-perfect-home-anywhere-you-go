"use client";
import { useState } from "react";
import { Link, Button } from "@heroui/react";
import logo from "@/images/logo.png";
import Image from "next/image";
import NavLink from "@/app/Utils/NavLink";
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/properties",
      label: "All Properties",
    },
    {
      path: "/services",
      label: "Services",
    },
    {
      path: "/blogs",
      label: "Blogs",
    },
    {
      path: "/dashboard",
      label: "Dashboard",
    },
  ];

  return (
    <nav className="sticky bg-background top-0 z-40 w-full border-b border-separator  py-4">
      <header className="mx-auto container flex   items-center justify-between px-6 ">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div className="flex items-center gap-2 ">
            <Image
              src={logo}
              className="max-w-full w-12 md:w-16  max-h-full "
              width={600}
              height={600}
              alt="logo"
            ></Image>
            <p className="font-extrabold  uppercase text-primary text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              Basha<span className="text-secondary">Nest</span>
            </p>
          </div>
        </div>
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((navItem) => (
            <NavLink key={navItem?.path} navItem={navItem} />
          ))}
        </ul>
        <div className="hidden items-center gap-4 md:flex">
          <Link href="#">Login</Link>
          <Button>Sign Up</Button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {navItems.map((navItem) => (
              <NavLink key={navItem?.path} navItem={navItem} />
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
