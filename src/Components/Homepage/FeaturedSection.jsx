import { ArrowRight } from "@gravity-ui/icons";
import PropertyFeaturedCard from "../Shared/PropertyFeaturedCard";
import { getProperties } from "@/app/lib/api/properties";

const FeaturedSection = async () => {
  const properties = await getProperties();

  return (
    <section className="container mx-auto px-3 sm:px-4 my-8 ">
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

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {properties.map((property, i) => (
          <PropertyFeaturedCard key={i} property={property} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
