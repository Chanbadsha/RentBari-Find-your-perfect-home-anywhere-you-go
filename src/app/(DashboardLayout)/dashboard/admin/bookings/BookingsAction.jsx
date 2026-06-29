"use client";

import { DeleteBooking, UpdateBooking } from "@/app/lib/action/action";
import { EllipsisVertical } from "@gravity-ui/icons";
import {
  Button,
  Description,
  Dropdown,
  Header,
  Label,
  Separator,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiCheckCircle, FiTrash2, FiXCircle } from "react-icons/fi";

export const BookingAction = ({ booking }) => {
  const router = useRouter();

  const handleChangeStatus = async (value) => {
    try {
      if (value === "approve-booking") {
        const bookingUpdate = await UpdateBooking({
          id: booking?._id,
          status: "approved",
        });

        if (bookingUpdate.success) {
          toast.success("Booking approved successfully");
        } else {
          toast("Failed to approve booking");
        }
      } else if (value === "reject-booking") {
        const bookingUpdate = await UpdateBooking({
          id: booking?._id,
          status: "rejected",
        });

        if (bookingUpdate.success) {
          toast.success("Booking rejected successfully");
        } else {
          toast("Failed to reject booking");
        }
      } else if (value === "delete-booking") {
        const bookingDelete = await DeleteBooking(booking?._id);

        if (bookingDelete.success) {
          toast.success("Booking deleted successfully");
        } else {
          toast("Failed to delete booking");
        }
      } else {
        toast("Invalid action");
      }
    } catch (error) {
      toast("Something went wrong");
    } finally {
      router.refresh();
    }
  };

  return (
    <Dropdown>
      <Button isIconOnly aria-label="Menu" variant="secondary">
        <EllipsisVertical className="outline-none" />
      </Button>

      <Dropdown.Popover>
        <Dropdown.Menu onAction={(key) => handleChangeStatus(key)}>
          {/* Booking Status */}
          <Dropdown.Section>
            <Header>Booking Status</Header>

            <Dropdown.Item id="approve-booking" textValue="Approve Booking">
              <div className="flex h-8 items-start justify-center pt-px">
                <FiCheckCircle className="size-4 shrink-0 text-emerald-600" />
              </div>

              <div className="flex flex-col">
                <Label>Approve Booking</Label>
                <Description>Confirm and approve this booking</Description>
              </div>
            </Dropdown.Item>

            <Dropdown.Item id="reject-booking" textValue="Reject Booking">
              <div className="flex h-8 items-start justify-center pt-px">
                <FiXCircle className="size-4 shrink-0 text-amber-600" />
              </div>

              <div className="flex flex-col">
                <Label>Reject Booking</Label>
                <Description>Decline this booking request</Description>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>

          <Separator />

          {/* Danger Zone */}
          <Dropdown.Section>
            <Header>Danger Zone</Header>

            <Dropdown.Item
              id="delete-booking"
              textValue="Delete Booking"
              variant="danger"
            >
              <div className="flex h-8 items-start justify-center pt-px">
                <FiTrash2 className="size-4 shrink-0 text-danger" />
              </div>

              <div className="flex flex-col">
                <Label>Delete Booking</Label>
                <Description>Permanently remove this booking</Description>
              </div>
            </Dropdown.Item>
          </Dropdown.Section>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
