"use client";

import { UpdateBooking, UpdateProperty } from "@/app/lib/action/action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const PropertyAccept = ({ property }) => {
  const router = useRouter();

  const acceptProperty = async () => {
    const propertyId = property?._id;

    const updateProperty = await UpdateProperty({
      id: propertyId,
      status: "approved",
    });
    if (updateProperty.success) {
      toast.success("Property accepted successfully!");
      router.refresh();
    } else {
      toast(updateProperty.message);
    }
  };

  const rejectProperty = async () => {
    const propertyId = property?._id;

    const updateProperty = await UpdateProperty({
      id: propertyId,
      status: "reject",
    });
    if (updateProperty.success) {
      toast.success("Property rejected successfully!");
      router.refresh();
    } else {
      toast(updateProperty.message);
    }
  };
  return (
    <div className="flex items-center gap-2 self-end sm:self-auto">
      <button
        onClick={rejectProperty}
        className="text-xs font-bold text-rose-600 border border-rose-200 hover:bg-rose-50 px-4 py-2 rounded-xl transition-colors"
      >
        Decline
      </button>
      <button
        onClick={acceptProperty}
        className="text-xs font-bold bg-[#00523A] hover:bg-[#00402e] text-white px-4 py-2 rounded-xl transition-colors shadow-sm"
      >
        Accept
      </button>
    </div>
  );
};

export default PropertyAccept;
