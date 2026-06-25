"use client";
import { House } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

const NoDataUi = () => {
  const router = useRouter();
  const handleReset = () => {
    router.replace("/properties");
  };
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center border border-dashed border-foreground/20 rounded-3xl bg-background">
      <div className="w-16 h-16 rounded-full border border-foreground/10 flex items-center justify-center mb-4">
        <House className="w-8 h-8 text-foreground/40" />
      </div>

      <h3 className="text-xl font-semibold text-foreground">
        No Properties Found
      </h3>

      <p className="mt-2 max-w-md text-sm text-foreground/60">
        We couldn&apos;t find any properties matching your search criteria. Try
        adjusting the location, property type, or price range.
      </p>

      <button
        onClick={handleReset}
        className="mt-6 px-5 py-2.5 rounded-xl bg-secondary text-white font-medium transition hover:opacity-90"
      >
        Clear Filters
      </button>
    </div>
  );
};

export default NoDataUi;
