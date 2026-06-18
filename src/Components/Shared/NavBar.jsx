"use client";
import { authClient } from "@/app/lib/auth-client";
import logo from "@/images/logo.png";
import NavLink from "@/Utils/NavLink";
import { ThemeSwitch } from "@/Utils/ThemeSwitch";
import { Avatar, Link } from "@heroui/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
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
        <ul className="hidden md:flex items-center xl:gap-2 ">
          {navItems.map((navItem) => (
            <NavLink key={navItem.path} navItem={navItem} />
          ))}
        </ul>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          <ThemeSwitch />
          {user ? (
            <>
              <>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="rounded-full transition-transform duration-200 hover:scale-105"
                  >
                    <Avatar className="ring-2 ring-border hover:ring-primary/30 transition-all">
                      <Avatar.Image
                        alt="Profile"
                        src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3"
                      />
                      <Avatar.Fallback>SR</Avatar.Fallback>
                    </Avatar>
                  </button>

                  {open && (
                    <ul className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-xl animate-in fade-in zoom-in-95 duration-200">
                      <li>
                        <Link
                          href="/dashboard"
                          className="flex bg-background no-underline w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-foreground/30  duration-300 ease-out"
                          onClick={() => {
                            setValue("userRole", "job-seeker");
                            setOpen(false);
                          }}
                        >
                          {/* <LayoutDashboard size={16} /> */}
                          Dashboard
                        </Link>
                      </li>

                      <li>
                        <button
                          type="button"
                          className="flex bg-background no-underline w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-foreground/30 text-danger duration-300 ease-out"
                          onClick={async () => {
                            await authClient.signOut({
                              fetchOptions: {
                                onSuccess: () => {
                                  toast.success("User successfully logout");
                                },
                              },
                            });

                            setOpen(false);
                          }}
                        >
                          {/* <LogOut size={16} /> */}
                          Log out
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            </>
          ) : (
            <>
              {" "}
              <Link
                className="text-sm no-underline px-4 py-2 rounded-lg bg-secondary text-white font-semibold hover:opacity-90 transition"
                href="/auth/login"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="hidden no-underline lg:inline-flex text-sm px-4 py-2 rounded-lg bg-secondary text-white font-semibold hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </>
          )}
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
