import { getProperties } from "@/app/lib/api/properties";
import PropertyFeaturedCard from "../Shared/PropertyFeaturedCard";
import { getUserSession } from "@/app/lib/core/session";

const RecentlyAdded = async () => {
  const user = await getUserSession();
  const favorites = user?.favorites || [];
  const properties =
    (await getProperties({
      limit: 4,
      sortOrder: "desc",
      sortBy: "createdAt",
    })) || [];
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
      <div>
        {properties && properties.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {properties.map((property, ind) => (
              <PropertyFeaturedCard
                key={ind}
                property={property}
                favorites={favorites}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-72 w-full animate-pulse bg-gray-200 rounded-2xl"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentlyAdded;
