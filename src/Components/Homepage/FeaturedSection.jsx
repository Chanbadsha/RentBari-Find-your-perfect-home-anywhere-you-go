import { ArrowRight } from "@gravity-ui/icons";
import PropertyFeaturedCard from "../Shared/PropertyFeaturedCard";
import { getFeaturedProperties } from "@/app/lib/api/properties";

const FeaturedSection = async () => {
  let properties = [];
  let error = null;

  try {
    properties = await getFeaturedProperties();
  } catch (err) {
    error = err;
  }

  return (
    <section className="container mx-auto px-3 sm:px-4 my-8">
      {/* Header */}
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-foreground">
          Featured Properties
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm sm:text-base text-foreground/70 max-w-xl">
            Handpicked premium stays and workspaces for you.
          </p>

          <button className="group inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition self-start sm:self-auto">
            View All
            <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Error State */}
      {error ? (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
          <div className="text-4xl mb-3">⚠️</div>
          <h3 className="text-lg font-semibold text-red-700">
            Failed to load properties
          </h3>
          <p className="text-sm text-red-600 mt-2">
            Something went wrong while fetching featured properties.
          </p>
        </div>
      ) : !properties?.length ? (
        /* Empty State */
        <div className="mt-8 rounded-2xl border border-dashed border-foreground/20 p-10 text-center">
          <div className="text-5xl mb-3">🏠</div>
          <h3 className="text-lg font-semibold text-foreground">
            No Properties Found
          </h3>
          <p className="text-sm text-foreground/60 mt-2">
            There are currently no featured properties available.
          </p>
        </div>
      ) : (
        /* Grid */
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {properties.slice(0, 8).map((property) => (
            <PropertyFeaturedCard key={property._id} property={property} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedSection;
