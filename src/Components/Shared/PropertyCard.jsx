"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Heart, MapPin, LayoutCellsLarge, ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";
import { ValidImgUrl } from "@/Utils/ValidImgUrl";

// Inline custom mini SVG components for metrics to match layout style seamlessly
const BedIcon = () => (
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
      d="M2.25 12h19.5M2.25 12v6.75A2.25 2.25 0 0 0 4.5 21h15a2.25 2.25 0 0 0 2.25-2.25V12M2.25 12V6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25V12M6.75 6.75h.75v.75h-.75v-.75ZM6.75 12h.75v.75h-.75V12Zm10.5-5.25h.75v.75h-.75v-.75Zm0 5.25h.75v.75h-.75V12Z"
    />
  </svg>
);

const BathIcon = () => (
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
      d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0M12 15h.008v.008H12V15Z"
    />
  </svg>
);

const VerifiedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-3.5 h-3.5"
  >
    <path
      fillRule="evenodd"
      d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-7.446-2.15a.75.75 0 0 0-1.063 1.061l1.25 1.25a.75.75 0 0 0 1.06 0l2.25-2.25a.75.75 0 0 0-1.06-1.06l-1.72 1.72-0.717-.718Z"
      clipRule="evenodd"
    />
  </svg>
);

export default function PropertyFeaturedCard({ property }) {
  const [liked, setLiked] = useState(false);

  // Fallback data mapping matching your precise Dark card UI requirements
  const data = {
    title: "Skyline Penthouse",
    price: "৳ 120,000",
    location: "Gulshan 2, Dhaka",
    beds: 3,
    baths: 4,
    size: "3,200 sqft",
    // Premium residential placeholder image asset
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&h=400&q=80",
  };

  return (
    <div className="group w-full  rounded-2xl overflow-hidden bg-background border border-foreground/30 shadow-lg hover:shadow-2xl hover:border-slate-700/60 transition-all duration-300">
      {/* IMAGE SECTION */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={ValidImgUrl(property?.coverImage)}
          alt={property?.propertyTitle}
          fill
          unoptimized // Used for external unsplash URL rendering stability
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Brand Themed Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#111622]/90 via-black/10 to-transparent" />

        {/* Upper Left Floating Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
          <span className="text-[10px] font-extrabold uppercase tracking-widest bg-slate-900/70 backdrop-blur-md text-[#4fd1c5] px-2.5 py-1 rounded-md border border-[#4fd1c5]/20">
            Apartment
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wide bg-[#3cd3b3]/20 backdrop-blur-md text-[#3cd3b3] px-2 py-1 rounded-md border border-[#3cd3b3]/30 flex items-center gap-1">
            <VerifiedIcon /> Verified
          </span>
        </div>

        {/* Favorite/Like Target Interaction */}
        <button
          onClick={() => setLiked(!liked)}
          className={`
            ${liked ? "bg-red-500/90 text-white" : "bg-slate-900/40 backdrop-blur-md text-white hover:bg-red-500/80"}
            absolute top-3 right-3
            flex items-center justify-center
            w-9 h-9 rounded-full
            border border-white/10
            transition-all duration-300
            z-10
          `}
        >
          <Heart
            fill={liked ? "currentColor" : "none"}
            className="h-4 w-4 transition-transform duration-300 active:scale-125"
          />
        </button>
      </div>

      {/* CONTENT BLOCK */}
      <div className="p-4 space-y-4">
        {/* Title & Price Header Line */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold tracking-tight text-foreground  ">
            {property?.propertyTitle}
          </h3>
          <span className="text-lg font-extrabold text-primary shrink-0">
            {property?.rentPrice}
            <span className="text-xs font-medium text-foreground/70">/mo</span>
          </span>
        </div>

        {/* Location Row */}
        <div className="flex items-center gap-1.5 text-xs text-foreground/70 font-medium">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>{property?.location}</span>
        </div>

        <div className="h-px bg-slate-800/80" />

        <div className="flex items-center justify-between text-xs font-semibold text-foreground py-0.5">
          <div className="flex items-center gap-1.5">
            <BedIcon />
            <span>{property?.bedrooms} Bed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BathIcon />
            <span>{property?.bathrooms} Bath</span>
          </div>
          <div className="flex items-center gap-1.5 text-foreground/70">
            <LayoutCellsLarge className="h-3.5 w-3.5 text-foreground/70" />
            <span>{property?.flatSize} sqft</span>
          </div>
        </div>

        <Link
          href={`/properties/${property._id}`}
          className="
          flex gap-0.5 items-center justify-center
                w-full py-2.5 mt-1 rounded-xl
                border border-secondary/70 bg-secondary/80
                text-white/90   font-semibold text-sm
                hover:bg-secondary hover:scale-[1.02] 
                active:scale-[0.99]
                transition-all duration-300
                group
            "
        >
          View Details{" "}
          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
