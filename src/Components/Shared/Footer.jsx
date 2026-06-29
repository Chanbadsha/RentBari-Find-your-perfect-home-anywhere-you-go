"use client";

import { Envelope, Handset, LogoGithub, MapPin } from "@gravity-ui/icons";
import Link from "next/link";
import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground font-inter border-t border-foreground/20">
      {/* Upper Main Footer Content */}
      <div className="container mx-auto px-6 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Column 1: Brand & Description */}
        <div className="flex flex-col space-y-5">
          <h2 className=" tracking-wide font-extrabold uppercase text-primary text-xl md:text-2xl lg:text-3xl">
            Rent<span className="text-secondary">Bari</span>
          </h2>

          <p className="text-sm leading-relaxed text-foreground/70 max-w-xs">
            Leading the future of digital real estate in Bangladesh.
            Transparent, secure, and effortless property management.
          </p>
          {/* Social Icons Wrapper */}
          <div className="flex items-center space-x-4 pt-2">
            {/* Github/Social Icon */}
            <Link
              href="#"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/70 hover:bg-primary font-bold text-white/70 hover:text-white transition-all duration-200"
              aria-label="GitHub"
            >
              <LogoGithub className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            </Link>
            {/* X / Twitter Icon */}
            <Link
              href="#"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/70 hover:bg-primary font-bold text-white/70 hover:text-white transition-all duration-200"
              aria-label="Twitter"
            >
              <FaXTwitter className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            </Link>
            {/* Website / Dribbble / Globe Icon */}
            <Link
              href="#"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary/70 hover:bg-primary font-bold text-white/70 hover:text-white transition-all duration-200"
              aria-label="Instagram"
            >
              <BsInstagram className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
            </Link>
          </div>
        </div>

        {/* Column 2: About Links */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-sm font-semibold tracking-wider text-secondary uppercase">
            About
          </h3>
          <ul className="space-y-2.5 text-sm text-foreground/70">
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                Our Mission
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                Team
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                Press
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-sm font-semibold tracking-wider text-secondary uppercase">
            Quick Links
          </h3>
          <ul className="space-y-2.5 text-sm text-foreground/70">
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                Browse Houses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                Rent Offices
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                List Property
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="flex flex-col space-y-3">
          <h3 className="text-sm font-semibold tracking-wider text-secondary  uppercase">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-foreground/70">
            <li className="flex items-center space-x-2.5">
              <Envelope />
              <a
                href="mailto:support@rentbari.com"
                className="hover:text-foreground text-foreground/70 transition-colors"
              >
                support@rentbari.com
              </a>
            </li>
            <li className="flex items-center space-x-2.5">
              <Handset />
              <a
                href="tel:+8801806066550"
                className="hover:text-foreground text-foreground/70 transition-colors"
              >
                +880 1234 567890
              </a>
            </li>
            <li className="flex items-start space-x-2.5">
              <MapPin />{" "}
              <span className="hover:text-foreground text-foreground/70">
                Banani, Dhaka 1213
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Lower Copyright Bar */}
      <div className="border-t border-foreground/20 bg-background">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/70 font-medium">
          <div>&copy; {currentYear} RentBari. All rights reserved.</div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
