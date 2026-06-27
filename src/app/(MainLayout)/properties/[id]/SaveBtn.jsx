"use client";
import { handleFavorite } from "@/Utils/handleFavorite";
import { Heart } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

export const SaveBtn = ({ propertyId, isFavorite }) => {
  const router = useRouter();
  const handleFavorites = async () => {
    await handleFavorite(propertyId);
    router.refresh();
  };
  return (
    <div>
      <button
        onClick={handleFavorites}
        className={`w-full h-12 rounded-2xl border flex items-center justify-center gap-2 transition ${
          isFavorite
            ? "bg-red-50 border-red-200 text-red-600"
            : "border-gray-200 hover:bg-gray-500"
        }`}
      >
        <Heart
          className="w-4 h-4"
          fill={isFavorite ? "currentColor" : "none"}
        />
        Save Property
      </button>
    </div>
  );
};
