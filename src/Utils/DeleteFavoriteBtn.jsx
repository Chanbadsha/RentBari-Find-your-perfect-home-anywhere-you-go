"use client";
import { handleFavorite } from "@/Utils/handleFavorite";
import { Heart, TrashBin } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const DeleteFavoriteBtn = ({ propertyId }) => {
  const router = useRouter();
  const handleFavorites = async () => {
    await handleFavorite(propertyId);
    toast.success("Property removed from favorites");
    router.refresh();
  };
  return (
    <div onClick={handleFavorites}>
      <TrashBin size={18} strokeWidth={2.5} />
    </div>
  );
};
