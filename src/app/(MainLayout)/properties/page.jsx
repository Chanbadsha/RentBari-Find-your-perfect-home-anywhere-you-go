import { getProperties } from "@/app/lib/api/properties";
import NoDataUi from "@/Components/Shared/NoDataUi";
import PropertyCard from "@/Components/Shared/PropertyCard";
import PropertySearchBar from "@/Utils/PropertySearchBar";

const PropertiesPage = async ({ searchParams }) => {
  const query = await searchParams;

  const properties = await getProperties(query);
  console.log(properties);
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">
          Explore All Properties
        </h2>
        <p className="text-sm sm:text-base text-foreground/70 mt-1">
          Find verified rental homes across Bangladesh and beyond
        </p>
      </div>

      {/* Filters Section */}
      <div className="w-full mb-2">
        <PropertySearchBar width={"lg:w-full xl:w-full"} />
      </div>

      {properties?.length > 0 ? (
        <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property, ind) => (
            <PropertyCard key={ind} property={property} />
          ))}
        </div>
      ) : (
        <NoDataUi />
      )}
    </div>
  );
};

export default PropertiesPage;
