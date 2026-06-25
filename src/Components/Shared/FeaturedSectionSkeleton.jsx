const FeaturedSectionSkeleton = () => {
  return (
    <section className="container mx-auto px-3 sm:px-4 my-8">
      {/* Header Skeleton */}
      <div className="space-y-3 animate-pulse">
        <div className="h-10 w-72 rounded-lg bg-foreground/10" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="h-5 w-80 rounded bg-foreground/10" />
          <div className="h-5 w-20 rounded bg-foreground/10" />
        </div>
      </div>

      {/* Property Cards Skeleton */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl overflow-hidden border border-foreground/10 bg-background animate-pulse"
          >
            {/* Image */}
            <div className="h-56 w-full bg-foreground/10" />

            {/* Content */}
            <div className="p-4 flex flex-col gap-4">
              {/* Title + Price */}
              <div className="flex justify-between items-start gap-3">
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-3/4 rounded bg-foreground/10" />
                  <div className="h-5 w-1/2 rounded bg-foreground/10" />
                </div>

                <div className="h-6 w-16 rounded bg-foreground/10 shrink-0" />
              </div>

              {/* Location */}
              <div className="h-4 w-2/3 rounded bg-foreground/10" />

              {/* Divider */}
              <div className="h-px bg-foreground/10" />

              {/* Features */}
              <div className="flex justify-between">
                <div className="h-4 w-12 rounded bg-foreground/10" />
                <div className="h-4 w-12 rounded bg-foreground/10" />
                <div className="h-4 w-16 rounded bg-foreground/10" />
              </div>

              {/* Button */}
              <div className="h-11 w-full rounded-xl bg-foreground/10" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSectionSkeleton;
