"use client";
import { DeleteProperty } from "@/app/lib/action/action";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeletePropertyBtn = ({ propertyId }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const result = await DeleteProperty(propertyId);

    if (!result?.success) {
      toast("Failed to delete property. Please try again.", {
        icon: "❌",
      });
      throw new Error(result?.message || "Failed to delete property");
    }
    if (result?.deletedCount === 1) {
      toast.success("Property deleted successfully");
      router.push("/dashboard/owner/properties");
      router.refresh();
    }
  };
  return (
    <Button slot="close" variant="danger" onClick={handleDelete}>
      Delete Property
    </Button>
  );
};

export default DeletePropertyBtn;
