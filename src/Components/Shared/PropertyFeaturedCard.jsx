"use client";
import { handleFavorite } from "@/Utils/handleFavorite";
import { ValidImgUrl } from "@/Utils/ValidImgUrl";
import { Heart, MapPin } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function PropertyFeaturedCard({ property, favorites }) {
  const isFavorite = favorites?.includes(property._id);
  const [liked, setLiked] = useState(isFavorite || false);
  const router = useRouter();

  if (!property) {
    return <div className="h-72 animate-pulse bg-gray-200 rounded-2xl" />;
  }
  const handleFavorites = async () => {
    await handleFavorite(property._id);
    setLiked(!liked);
    router.refresh();
  };

  return (
    <div className="group w-full max-w-sm rounded-2xl overflow-hidden bg-background border border-foreground/10 shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* IMAGE SECTION */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={ValidImgUrl(property?.coverImage)}
          alt="Property"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        <button
          onClick={handleFavorites}
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
          <h3 className="text-xl font-bold tracking-tight text-foreground line-clamp-2 min-h-[56px]">
            {property?.propertyTitle}
          </h3>

          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wide rounded-full bg-primary/15 text-primary border border-primary/20 shadow-sm ">
            {property?.propertyType}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-foreground/60">
          <MapPin className="h-4 w-4 text-primary" />
          {property?.location}
        </div>

        {/* Divider */}
        <div className="h-px bg-foreground/10" />

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          {/* Price */}
          <p className="text-primary font-bold text-lg">
            ৳{property?.rentPrice}
            <span className="text-sm text-foreground/60 font-normal">/mo</span>
          </p>

          {/* Button */}
          <Link
            href={`/properties/${property._id}`}
            className="
            px-4 py-2 rounded-xl
            bg-secondary text-white
            font-semibold
            hover:scale-105 transition
            duration-300
          "
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
