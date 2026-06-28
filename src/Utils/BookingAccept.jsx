"use client";

import { UpdateBooking } from "@/app/lib/action/action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const BookingAccept = ({ booking }) => {
  const router = useRouter();

  const acceptBooking = async () => {
    const bookingId = booking?._id;

    const updatedBooking = await UpdateBooking({
      id: bookingId,
      status: "approved",
    });
    if (updatedBooking.success) {
      toast.success("Booking accepted successfully!");
      router.refresh();
    } else {
      toast(updatedBooking.message);
    }
  };
  return (
    <div className="flex items-center gap-2 self-end sm:self-auto">
      <button className="text-xs font-bold text-rose-600 border border-rose-200 hover:bg-rose-50 px-4 py-2 rounded-xl transition-colors">
        Decline
      </button>
      <button
        onClick={acceptBooking}
        className="text-xs font-bold bg-[#00523A] hover:bg-[#00402e] text-white px-4 py-2 rounded-xl transition-colors shadow-sm"
      >
        Accept
      </button>
    </div>
  );
};

export default BookingAccept;
