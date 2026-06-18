"use client";
import { useState } from "react";
import { Link, Button } from "@heroui/react";
import logo from "@/images/logo.png";
import Image from "next/image";
import NavLink from "@/Utils/NavLink";
import { ThemeSwitch } from "@/Utils/ThemeSwitch";
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      path: "/",
      label: "Home",
    },
    {
      path: "/properties",
      label: "Properties",
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
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background   py-4">
      <header className="mx-auto container flex items-center justify-between px-6">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition"
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

          {/* LOGO */}
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              className="hidden lg:block w-12 md:w-14"
              width={600}
              height={600}
              alt="logo"
            />

            <p className="font-extrabold uppercase text-primary text-xl md:text-2xl lg:text-3xl">
              Rent<span className="text-secondary">Bari</span>
            </p>
          </div>
        </div>

        {/* CENTER NAV */}
        <ul className="hidden md:flex items-center gap-2">
          {navItems.map((navItem) => (
            <NavLink key={navItem.path} navItem={navItem} />
          ))}
        </ul>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          <ThemeSwitch />
          <Link
            className="text-sm px-4 py-2 rounded-lg bg-secondary text-white font-semibold hover:opacity-90 transition"
            href="#"
          >
            Login
          </Link>

          <Button className="hidden lg:inline-flex text-sm px-4 py-2">
            Sign Up
          </Button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-separator md:hidden bg-background">
          <ul className="flex flex-col gap-2 p-4">
            {navItems.map((navItem) => (
              <NavLink key={navItem.path} navItem={navItem} />
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
