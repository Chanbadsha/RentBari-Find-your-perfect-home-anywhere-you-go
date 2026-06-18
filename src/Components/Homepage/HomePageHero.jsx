"use client";
import PropertySearchBar from "@/Utils/PropertySearchBar";
import Image from "next/image";
import bgDayImg from "@/images/day-view.png";
import bgNightImg from "@/images/night-view.png";
import { useTheme } from "next-themes";

const HomePageHero = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section className="relative w-full">
      <div className="relative h-200 w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src={isDark ? bgNightImg : bgDayImg}
          alt="Luxury Property View"
          fill
          priority
          className="object-cover scale-100"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/70 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="flex flex-col items-center justify-center space-y-6">
            {/* Badge */}
            <div className="inline-flex text-center font-semibold items-center px-4 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-sm">
              Trusted Property Marketplace
            </div>

            {/* Heading */}
            <h1 className="text-3xl text-center max-w-3xl md:text-5xl font-bold text-white leading-tight">
              Find your perfect home in{" "}
              <span className="text-primary dark:text-secondary">
                Bangladesh
              </span>{" "}
              and beyond
            </h1>

            {/* Subtext */}
            <p className="text-white/80 text-center text-sm md:text-base max-w-xl mx-auto">
              Search, compare, and book verified properties with confidence.
              Secure, fast, and built for modern living.
            </p>

            {/* Search Card */}
            <div className="mt-6 w-full md:w-10/12 lg:w-full">
              {/* <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl  shadow-xl"> */}
              <PropertySearchBar />
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePageHero;
