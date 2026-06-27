import { getUserSession } from "@/app/lib/core/session";
import FavoriteCard from "@/Components/Shared/FavoriteCard";
import Link from "next/link";
import { FiHeart, FiPlus } from "react-icons/fi";

export default async function TenantFavorites() {
  const user = await getUserSession();

  const favorites = user?.favorites || [];

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 font-sans antialiased">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 mb-3">
            <FiHeart className="text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Wishlist
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Favorite Properties
          </h1>

          <p className="text-foreground/60 mt-2 max-w-2xl">
            Keep track of the properties you love and quickly access them
            whenever you&apos;re ready to book.
          </p>
        </div>

        <Link
          href="/properties"
          className="inline-flex items-center gap-2 bg-[#00523A] hover:bg-[#00402e] text-white px-5 py-3 rounded-2xl font-medium transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <FiPlus className="text-lg" />
          Explore Properties
        </Link>
      </div>

      {/* Stats */}
      {favorites.length > 0 && (
        <div className="mb-8">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-foreground/10 bg-card px-5 py-4 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FiHeart className="text-primary text-lg" />
            </div>
            <div>
              <p className="text-xs text-foreground/60 uppercase tracking-wider">
                Saved Properties
              </p>
              <p className="text-2xl font-bold text-foreground">
                {favorites.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="max-w-md w-full rounded-3xl border border-foreground/10 bg-card p-10 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <FiHeart className="text-3xl text-primary" />
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-3">
              No Favorite Properties Yet
            </h2>

            <p className="text-foreground/60 mb-8 leading-relaxed">
              Start exploring properties and save the ones you love. Your
              favorite properties will appear here for quick access.
            </p>

            <Link
              href="/properties"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#00523A] px-6 py-3 font-medium text-white transition hover:bg-[#00402e]"
            >
              <FiPlus />
              Browse Properties
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          {favorites.map((propertyId, index) => (
            <FavoriteCard key={index} propertyId={propertyId} />
          ))}
        </div>
      )}
    </div>
  );
}
