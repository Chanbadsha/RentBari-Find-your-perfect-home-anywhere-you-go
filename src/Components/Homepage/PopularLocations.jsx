import Image from "next/image";
import coxBazar from "@/images/cox-bazar.jpg";
import sylhet from "@/images/sylhet.jpg";
import dhaka from "@/images/dhaka.jpg";
import chattagram from "@/images/chattagram.jpg";
const locations = [
  {
    name: "Dhaka",
    properties: "1,240+ Properties",
    image: dhaka,
  },
  {
    name: "Sylhet",
    properties: "450+ Properties",
    image: sylhet,
  },
  {
    name: "Chattogram",
    properties: "820+ Properties",
    image: chattagram,
  },
  {
    name: "Cox's Bazar",
    properties: "310+ Properties",
    image: coxBazar,
  },
];

const PopularLocations = () => {
  return (
    <section className="container mx-auto px-3 sm:px-4 my-10 mt-16">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
          Explore Popular Locations
        </h2>
        <p className="text-sm sm:text-base text-foreground/70 mt-1">
          Discover premium living in Bangladesh&apos;s most sought-after cities
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {locations.map((item, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-md"
          >
            {/* Image */}
            <Image
              loading="eager"
              src={item.image}
              width={600}
              height={600}
              alt={item.name}
              className="h-56 w-full object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 p-4 text-white">
              <h3 className="text-lg font-semibold flex items-center gap-1">
                📍 {item.name}
              </h3>
              <p className="text-xs text-white/80">{item.properties}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularLocations;
