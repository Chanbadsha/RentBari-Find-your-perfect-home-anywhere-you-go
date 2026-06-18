"use client";

import Image from "next/image";
import React from "react";

export default function ClientExperiences() {
  const testimonials = [
    {
      name: "Rahat Karim",
      role: "Verified Tenant",
      date: "MARCH 12, 2024",
      quote:
        '"Found the perfect duplex in Gulshan within a week. The verification process gave me peace of mind."',
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      name: "Sarah Afreen",
      role: "Expat Tenant",
      date: "FEBRUARY 28, 2024",
      quote:
        '"The digital lease signing made my relocation from London so much easier. Transparent and efficient."',
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      name: "Imran Ahmed",
      role: "Home Owner",
      date: "JANUARY 15, 2024",
      quote:
        '"Listing my property was simple. The tenant matching algorithm is spot on for premium rentals."',
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      name: "Nadia Islam",
      role: "Verified Tenant",
      date: "JANUARY 02, 2024",
      quote:
        '"Excellent customer support. They handled my utility setup smoothly as part of the concierge service."',
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    },
  ];

  const StarRating = () => (
    <div className="flex gap-1 my-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4 text-orange-400"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );

  return (
    <section className=" border-t   py-20 px-4 text-foreground sm:px-6 lg:px-8 font-inter">
      {/* Header section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl font-semibold  tracking-tight sm:text-4xl ">
          Client Experiences
        </h2>
        <p className="mt-3 text-sm md:text-base text-foreground/70 tracking-wide">
          Read what our community has to say about their new homes
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-background border border-foreground/30 text-foreground rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-slate-600/60"
          >
            <div>
              {/* Header profile row */}
              <div className="flex items-center gap-3">
                <div className="relative p-0.5 rounded-full bg-linear-to-tr from-teal-500 to-emerald-400">
                  <Image
                    width={600}
                    height={600}
                    className="w-11 h-11 rounded-full object-cover border border-[#1e2633]"
                    src={item.avatar}
                    alt={item.name}
                  />
                </div>
                <div>
                  <h3 className="text-base font-semibold  leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs text-foreground/70 font-medium">
                    {item.role}
                  </p>
                </div>
              </div>

              {/* Rating stars */}
              <StarRating />

              <p className="text-[13px] leading-relaxed text-foreground/70 italic font-light tracking-wide">
                {item.quote}
              </p>
            </div>

            <div className="mt-8 pt-2">
              <span className="text-[10px] uppercase tracking-widest  font-semibold block">
                {item.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
