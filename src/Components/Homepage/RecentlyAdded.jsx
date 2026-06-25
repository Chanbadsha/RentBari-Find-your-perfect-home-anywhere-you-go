import { getProperties } from "@/app/lib/api/properties";
import PropertyFeaturedCard from "../Shared/PropertyFeaturedCard";

const RecentlyAdded = async () => {
  const properties = await getProperties();

  return (
    <section className="container mx-auto px-3 sm:px-4 my-8 mb-12 ">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
          Recently Added
        </h2>
        <p className="text-sm sm:text-base text-foreground/70 mt-1">
          Fresh listings from the last 24 hours
        </p>
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {properties?.slice(0, 4).map((property, i) => (
          <PropertyFeaturedCard key={i} property={property} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyAdded;
