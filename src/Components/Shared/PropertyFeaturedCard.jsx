"use client";
import Image from "next/image";
import { Heart, MapPin } from "@gravity-ui/icons";
import Img from "@/images/day-villa.jpg";
import { useState } from "react";
export default function PropertyFeaturedCard() {
  const [liked, setLiked] = useState(false);
  return (
    <div className="group w-full max-w-sm rounded-2xl overflow-hidden bg-background border border-foreground/10 shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* IMAGE SECTION */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={Img}
          alt="Property"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        <button
          onClick={() => setLiked(!liked)}
          className={`
            ${liked ? "bg-red-500/80 " : ""}
            absolute top-3 right-3
      flex items-center justify-center
      w-9 h-9 rounded-full
      bg-background/40 backdrop-blur-md
      text-white
      hover:bg-red-500/80
      transition-all duration-300
      group`}
        >
          <Heart className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        {/* Title + Tag */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground leading-tight">
            Emerald Sky Penthouse
          </h3>

          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-primary/15 text-primary border border-primary/20 shadow-sm ">
            Villa
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-foreground/60">
          <MapPin className="h-4 w-4 text-primary" />
          Gulshan 2, Dhaka
        </div>

        {/* Divider */}
        <div className="h-px bg-foreground/10" />

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <p className="text-primary font-bold text-lg">
            ৳145,000
            <span className="text-sm text-foreground/60 font-normal">/mo</span>
          </p>

          {/* Button */}
          <button
            className="
            px-4 py-2 rounded-xl
            bg-secondary text-white
            font-semibold
            hover:scale-105 transition
            duration-300
          "
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}
