import { getPropertiesById } from "@/app/lib/api/properties";
import ReviewsSection from "@/Components/Shared/ReviewsSection";
import { ValidImgUrl } from "@/Utils/ValidImgUrl";
import { Car, ShieldCheck, Snowflake } from "@gravity-ui/icons";
import { ChevronRight, Heart, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaSwimmingPool } from "react-icons/fa";
import { FaWifi } from "react-icons/fa6";
import { RiSofaFill } from "react-icons/ri";

const PropertyDetailPage = async ({ params }) => {
  const { id } = await params;
  const property = await getPropertiesById(id);
  console.log(property);
  const instantBooking = true;
  const securityDepositRequired = false;
  const securityDepositAmount = 500;

  const isFavorite = false;
  const amenityList = [
    {
      label: "High-speed Wi-Fi",
      icon: (
        <FaWifi className="text-[#105e53] group-hover:text-primary w-4.5 h-4.5" />
      ),
    },
    { label: "Private Pool", icon: <FaSwimmingPool /> },
    {
      label: "2 Car Garage",
      icon: (
        <Car className="text-[#105e53] group-hover:text-primary w-4.5 h-4.5" />
      ),
    },
    {
      label: "24/7 Security",
      icon: (
        <ShieldCheck className="text-[#105e53] group-hover:text-primary w-4.5 h-4.5" />
      ),
    },
    { label: "Fully Furnished", icon: <RiSofaFill /> },
    {
      label: "Central AC",
      icon: (
        <Snowflake className="text-[#105e53] group-hover:text-primary w-4.5 h-4.5" />
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      {/* Breadcrumbs link path */}
      <div className="flex mt-2 items-center gap-1.5 text-xs font-medium text-foreground/70 mb-6">
        <Link
          href="/properties"
          className="hover:text-foreground transition-colors"
        >
          Properties
        </Link>
        <ChevronRight className="w-3 h-3 text-gray-300" />
        <a href="#" className="hover:text-foreground transition-colors">
          {property?.propertyType}
        </a>
        <ChevronRight className="w-3 h-3 text-foreground/30" />
        <span className="hover:text-foreground truncate">
          {property?.propertyTitle}
        </span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 w-full">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-8 space-y-6">
          {/* Hero Image */}
          <div className="overflow-hidden rounded-3xl">
            <Image
              src={ValidImgUrl(property?.coverImage)}
              alt="Property"
              width={1400}
              height={900}
              className="w-full h-125 object-cover"
            />
          </div>
          {/* Gallery */}
          <div className="grid grid-cols-3 gap-3">
            {property?.galleryImages?.map((img, i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl">
                <Image
                  src={ValidImgUrl(img?.url)}
                  alt={`Gallery ${img?.alt}`}
                  width={400}
                  height={300}
                  className="w-full h-36 object-cover hover:scale-105 transition duration-300 cursor-pointer"
                />

                {i === 2 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                    +12 Photos
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Description */}
          <section className="bg-background border border-foreground/10 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-foreground/10 pb-3">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-foreground">
                Description
              </h2>
            </div>

            {/* Content */}
            <p className="text-foreground/70 leading-relaxed text-sm md:text-base tracking-wide">
              Experience luxury living with breathtaking, uninterrupted ocean
              views at the Oceanic Vista Villa, a true architectural masterpiece
              designed to redefine modern coastal elegance. This premium
              residence blends contemporary design with timeless sophistication,
              offering spacious interiors, natural light-filled rooms, and
              high-end finishes throughout. Located in the heart of Cox’s Bazar
              coastline, the villa provides a serene escape where comfort meets
              exclusivity. Residents can enjoy peaceful mornings overlooking the
              sea, relaxing evenings with golden sunsets, and a lifestyle
              enriched by nature’s beauty. Perfect for families, travelers, or
              long-term stays, this property delivers both comfort and prestige
              in every detail, making it an ideal choice for those seeking a
              refined and luxurious living experience by the ocean.
            </p>

            {/* Footer hint */}
            <div className="flex items-center justify-between pt-3 border-t border-foreground/10">
              <p className="text-xs text-foreground/50">
                Updated recently • Verified listing
              </p>

              <button className="text-xs font-medium text-[#0a5246] hover:underline">
                Read more
              </button>
            </div>
          </section>
          {/* Amenities */}
          <div className="w-full max-w-5xl p-6 bg-background shadow rounded-xl">
            <h2 className="text-2xl font-bold text-foreground tracking-tight mb-5">
              Amenities
            </h2>

            {/* 3-Column Responsive Grid matching HeroUI structure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {amenityList.map((item, index) => (
                <div
                  key={index}
                  className="flex group items-center gap-3.5 px-4 py-3.5 bg-background/70 border border-foreground/30 rounded-xl shadow-xs transition-all duration-200 hover:border-foreground/60"
                >
                  <div className="flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-[14px] font-medium text-foreground/70 group-hover:text-foreground tracking-wide">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking & Property Preferences */}
          <div className="bg-background border border-foreground/20 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-5">
              Booking & Property Preferences
            </h2>

            <div className="space-y-4">
              {/* Instant Booking */}
              <div className="flex items-center justify-between rounded-xl border border-foreground/10 p-4">
                <div>
                  <h3 className="font-medium text-foreground">
                    Instant Booking
                  </h3>
                  <p className="text-sm text-foreground/60">
                    Guests can book instantly without approval.
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    instantBooking
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {instantBooking ? "Yes" : "No"}
                </span>
              </div>

              {/* Security Deposit */}
              <div className="rounded-xl border border-foreground/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">
                      Security Deposit Required
                    </h3>
                    <p className="text-sm text-foreground/60">
                      Refundable deposit for potential damages.
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      securityDepositRequired
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {securityDepositRequired ? "Yes" : "No"}
                  </span>
                </div>

                {securityDepositRequired ? (
                  <div className="mt-4 rounded-lg bg-primary/5 border border-primary/10 p-3">
                    <p className="text-sm text-foreground/70">
                      Security Deposit Amount
                    </p>
                    <p className="text-lg font-bold text-primary">
                      ${securityDepositAmount}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 rounded-lg bg-muted/40 border border-foreground/10 p-3">
                    <p className="text-sm text-foreground/60">
                      No security deposit is required for this property.
                    </p>
                  </div>
                )}
              </div>

              {/* Furnishing Type */}
              <div className="rounded-xl border border-foreground/10 p-4">
                <h3 className="font-medium text-foreground mb-3">
                  Furnishing Type
                </h3>

                <div className="flex gap-3 flex-wrap">
                  {/* Fully Furnished */}

                  <span
                    className={`px-3 py-1 rounded-full bg-secondary text-white text-xs font-semibold `}
                  >
                    {property?.isFurnished
                      ? "Fully Furnished"
                      : "Semi Furnished"}
                  </span>
                </div>

                <p className="text-sm text-foreground/60 mt-3">
                  Indicates the level of furniture and interior setup available
                  in this property.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full  bg-background rounded-2xl p-6 md:p-8 shadow-xs border border-foreground/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              {/* Left Column: House Rules */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  House Rules
                </h3>
                <ul className="space-y-3">
                  {property?.houseRules.map((rule, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-sm font-medium text-foreground/70"
                    >
                      <FaCheckCircle />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Extra Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground tracking-tight">
                  Extra Features
                </h3>
                <ul className="space-y-3">
                  {property?.extraFeatures.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-sm font-medium text-foreground/70"
                    >
                      <FaCheckCircle />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Review Section */}
          <ReviewsSection />
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 space-y-5">
            {/* Booking Card */}
            <div className="bg-background rounded-3xl border border-foreground/20 shadow-lg p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {property?.propertyTitle}
                  </h1>

                  <div className="flex items-center gap-2 mt-2 text-foreground/60">
                    <MapPin className="w-4 h-4" />
                    <span>{property?.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-[#1a7361]">
                    ${property?.rentPrice}
                  </div>

                  <div className="text-sm text-foreground/60">
                    per {property?.rentType}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary text-white text-xs font-medium">
                  {property?.propertyType}
                </span>

                <span className="px-3 py-1 rounded-full bg-green-600 text-white text-xs font-medium">
                  Verified
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-background/90 border border-primary/10 rounded-2xl p-3 text-center">
                  <p className="text-xs text-foreground/70">Beds</p>
                  <p className="font-bold text-lg">{property?.bedrooms}</p>
                </div>

                <div className="bg-background/90 border border-primary/10 rounded-2xl p-3 text-center">
                  <p className="text-xs text-foreground/70">Baths</p>
                  <p className="font-bold text-lg">{property?.bathrooms}</p>
                </div>

                <div className="bg-background/90 border border-primary/10 rounded-2xl p-3 text-center">
                  <p className="text-xs text-foreground/70">Size</p>
                  <p className="font-bold text-lg">{property?.flatSize} sqft</p>
                </div>
              </div>

              <button className="w-full h-12 rounded-2xl bg-[#1a7361] hover:bg-[#145b4d] text-white font-semibold transition">
                Book Property
              </button>

              <button
                className={`w-full h-12 rounded-2xl border flex items-center justify-center gap-2 transition ${
                  isFavorite
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
              >
                <Heart
                  className="w-4 h-4"
                  fill={isFavorite ? "currentColor" : "none"}
                />
                Save Property
              </button>
            </div>

            {/* Agent Card */}
            <div className="bg-background rounded-3xl border border-foreground/20 p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Agent"
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <p className="text-xs text-gray-500 uppercase">Managed by</p>

                  <h3 className="font-semibold">Sarah Al-Zaman</h3>
                </div>
              </div>

              {/* import { Phone } from "@gravity-ui/icons"; */}
              <button className="flex items-center justify-center gap-2 mt-4 w-full h-11 rounded-xl border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-all duration-200">
                <Phone className="w-4 h-4" />
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;
