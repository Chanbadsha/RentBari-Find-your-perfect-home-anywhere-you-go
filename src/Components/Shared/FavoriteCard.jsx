import React from "react";
import { Trash2, Star, MapPin, Delete } from "lucide-react";
import Image from "next/image";
import { getPropertiesById } from "@/app/lib/api/properties";
import { TrashBin } from "@gravity-ui/icons";
import Link from "next/link";
import { ValidImgUrl } from "@/Utils/ValidImgUrl";
import { DeleteFavoriteBtn } from "@/Utils/DeleteFavoriteBtn";

export default async function FavoriteCard({ propertyId }) {
  const property = await getPropertiesById(propertyId);

  return (
    <div className="bg-background rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-foreground/30/80 overflow-hidden font-sans hover:shadow-[0_6px_26px_rgba(0,0,0,0.08)] transition-shadow duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative h-65 w-full group">
        <Image
          height={600}
          width={600}
          src={ValidImgUrl(property?.coverImage)}
          alt="Property"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />

        <button className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-2.5 rounded-full shadow-sm text-red-500 hover:text-red-600 hover:bg-background transition-colors duration-200">
          <DeleteFavoriteBtn propertyId={propertyId} />
        </button>

        <div className="absolute bottom-4 left-4 bg-[#0a5243] text-white text-[13px] font-semibold px-3 py-1.5 rounded-lg tracking-wide shadow-sm">
          {property?.instantBooking ? "Instant Book" : "Not Instant Book"}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col h-full">
        {/* Title + Rating */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h2 className="text-[22px] font-bold text-foreground tracking-tight leading-tight line-clamp-2">
            {property?.propertyTitle}
          </h2>

          <div className="flex items-center gap-1 mt-1 text-[#b48325] shrink-0">
            <Star size={16} fill="currentColor" stroke="none" />
            <span className="text-[15px] font-bold text-foreground/90">
              4.9
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-foreground/70 mb-4">
          <MapPin size={16} className="text-foreground/70" />
          <span className="text-[15px] font-medium tracking-wide">
            {property?.location}
          </span>
        </div>

        {/* THIS pushes HR to same level across cards */}
        <div className="flex-1" />

        {/* Fixed separator position */}
        <hr className="border-foreground/30 mb-4" />

        {/* Pricing + Date */}
        <div className="flex justify-between items-baseline mb-5">
          <div>
            <p className="text-[12px] font-bold text-foreground/70 uppercase mb-1">
              PRICE
            </p>
            <p className="text-[20px] font-bold text-[#0c6956]">
              ৳{property?.rentPrice}
              <span className="text-[15px] font-medium text-foreground/70">
                /mo
              </span>
            </p>
          </div>
        </div>

        {/* Button */}
        <Link
          href={`/properties/${property._id}`}
          className="w-full py-2.5 rounded-xl bg-foreground  flex justify-center items-center text-background font-semibold text-[14px] hover:opacity-90 transition-opacity duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
