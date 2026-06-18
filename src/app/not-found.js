"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070b12] text-white flex flex-col items-center justify-center px-6 py-12 font-sans select-none">
      <div className="max-w-xl w-full text-center flex flex-col items-center">
        {/* Large Glowing 404 Header */}
        <h1 className="text-8xl sm:text-9xl font-extrabold tracking-widest text-[#3ec2ae] drop-shadow-[0_0_25px_rgba(62,194,174,0.4)] transition-all duration-300">
          404
        </h1>

        {/* Central Nocturnal Conceptual Image Container */}
        <div className="my-8 w-full max-w-md aspect-[1.8/1] rounded-2xl overflow-hidden border border-slate-800/60 shadow-2xl relative group">
          <Image
            height={600}
            width={600}
            src="https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=600&h=333&q=80"
            alt="Open door to a starry night sky"
            className="w-full h-full object-cover opacity-80 brightness-75 group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#070b12] via-transparent to-transparent opacity-40" />
        </div>

        {/* Typography Content */}
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-3">
          Lost in the Nocturne?
        </h2>
        <p className="text-sm leading-relaxed text-slate-400 max-w-sm mx-auto mb-10 tracking-wide">
          The destination you&apos;re looking for seems to have vanished into
          the night. Let&apos;s get you back to your nest.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          {/* Primary Action Button */}
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-[#2db59f] hover:bg-[#259b88] text-[#070b12] font-semibold text-sm transition-all duration-200 active:scale-[0.98] shadow-lg shadow-[#2db59f]/10"
          >
            {/* Gravity-Style Home Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            Go To Home
          </Link>

          {/* Secondary Action Button */}
          <a
            href="/support"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-700/80 bg-slate-900/40 hover:bg-slate-800/50 hover:border-slate-600 text-slate-200 font-medium text-sm transition-all duration-200 active:scale-[0.98]"
          >
            {/* Gravity-Style Headset Support Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 0 1 5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
