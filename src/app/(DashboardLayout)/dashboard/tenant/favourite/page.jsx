import { getPropertiesByUserId } from "@/app/lib/api/properties";
import { getUserSession } from "@/app/lib/core/session";
import { ValidImgUrl } from "@/Utils/ValidImgUrl";
import { MapPin, Star, TrashBin } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default async function TenantDashBoard() {
  const user = await getUserSession();
  const properties = await getPropertiesByUserId(user?.id);

  return (
    <div className="min-h-screen bg-background p-8 font-sans antialiased text-foreground">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Favorites
          </h1>
          <p className="text-foreground/70 mt-1">
            Manage your saved properties and find your next home.
          </p>
        </div>
        <Link
          href={`/properties`}
          className="flex items-center gap-2 bg-[#00523A] hover:bg-[#00402e] text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
        >
          <FiPlus className="text-lg" />
          New Booking
        </Link>
      </div>

      {/* Main Table Card container */}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
        {properties.map((property, index) => (
          <div
            key={index}
            className="bg-background rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-foreground/30/80 overflow-hidden font-sans hover:shadow-[0_6px_26px_rgba(0,0,0,0.08)] transition-shadow duration-300 flex flex-col h-full"
          >
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
                <TrashBin size={18} strokeWidth={2.5} />
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
                  Downtown Manhattan, NY
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
                    $4,500
                    <span className="text-[15px] font-medium text-foreground/70">
                      /mo
                    </span>
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[12px] font-bold text-foreground/70 uppercase mb-1">
                    Added Date
                  </p>
                  <p className="text-[17px] font-semibold text-foreground/90">
                    Oct 12, 2023
                  </p>
                </div>
              </div>

              {/* Button */}
              <button className="w-full py-2.5 rounded-xl bg-foreground text-background font-semibold text-[14px] hover:opacity-90 transition-opacity duration-200">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
