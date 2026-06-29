"use client";
import { DeleteProperty, UpdateProperty } from "@/app/lib/action/action";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { FiCheck, FiTrash2, FiX } from "react-icons/fi";

export const PropertyAction = ({ property }) => {
  const router = useRouter();
  const handleApproveProperty = async () => {
    const propertyId = property?._id;

    const updateProperty = await UpdateProperty({
      id: propertyId,
      status: "approved",
    });
    if (updateProperty.success) {
      toast.success("Property approved successfully!");
      router.refresh();
    } else {
      toast(updateProperty.message);
    }
  };

  const handleRejectProperty = async () => {
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

  const handleDeleteProperty = async () => {
    const propertyId = property?._id;

    const result = await DeleteProperty(propertyId);

    if (!result?.success) {
      toast("Failed to delete property. Please try again.", {
        icon: "❌",
      });
      throw new Error(result?.message || "Failed to delete property");
    }
    if (result?.deletedCount === 1) {
      toast.success("Property deleted successfully");

      router.refresh();
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* APPROVE */}
      {property?.status === "pending" && (
        <AlertDialog>
          <Button
            variant="outline"
            title="Approve Property"
            className="p-2 rounded-lg border-none text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            <FiCheck size={16} />
          </Button>

          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-100">
                <AlertDialog.CloseTrigger />

                <AlertDialog.Header>
                  <AlertDialog.Icon status="success" />
                  <AlertDialog.Heading>Approve Property?</AlertDialog.Heading>
                </AlertDialog.Header>

                <AlertDialog.Body>
                  <div className="space-y-3">
                    <p className="text-sm text-foreground/80">
                      Are you sure you want to approve this property listing?
                    </p>

                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                      <p className="text-sm">
                        Property:{" "}
                        <strong className="text-emerald-700">
                          {property?.propertyTitle}
                        </strong>
                      </p>
                    </div>

                    <p className="text-sm text-foreground/60">
                      Once approved, this property will become visible to all
                      users on RentBari.
                    </p>
                  </div>
                </AlertDialog.Body>

                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleApproveProperty}
                    slot="close"
                    variant="tertiary"
                  >
                    Approve Property
                  </Button>

                  {/* <ApprovePropertyBtn
                                        propertyId={property._id}
                                      /> */}
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      )}

      {/* REJECT */}
      {property?.status === "pending" && (
        <AlertDialog>
          <Button
            variant="outline"
            title="Reject Property"
            className="p-2 rounded-lg border-none text-amber-600 hover:bg-amber-50 transition-colors"
          >
            <FiX size={16} />
          </Button>

          <AlertDialog.Backdrop>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-100">
                <AlertDialog.CloseTrigger />

                <AlertDialog.Header>
                  <AlertDialog.Icon status="warning" />
                  <AlertDialog.Heading>Reject Property?</AlertDialog.Heading>
                </AlertDialog.Header>

                <AlertDialog.Body>
                  <div className="space-y-3">
                    <p className="text-sm text-foreground/80">
                      Are you sure you want to reject this property listing?
                    </p>

                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                      <p className="text-sm">
                        Property:{" "}
                        <strong className="text-amber-700">
                          {property?.propertyTitle}
                        </strong>
                      </p>
                    </div>

                    <p className="text-sm text-foreground/60">
                      The owner will need to resubmit the property after making
                      corrections.
                    </p>
                  </div>
                </AlertDialog.Body>

                <AlertDialog.Footer>
                  <Button slot="close" variant="tertiary">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleRejectProperty}
                    slot="close"
                    variant="tertiary"
                  >
                    Reject Property
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        </AlertDialog>
      )}

      {/* DELETE */}
      <AlertDialog>
        <Button
          variant="outline"
          title="Delete Property"
          className="p-2 rounded-lg border-none text-red-500 hover:bg-red-50 transition-colors"
        >
          <FiTrash2 size={16} />
        </Button>

        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-100">
              <AlertDialog.CloseTrigger />

              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>
                  Delete Property Permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body>
                <div className="space-y-3">
                  <p className="text-sm text-foreground/80">
                    Are you sure you want to permanently delete this property?
                  </p>

                  <div className="rounded-xl border border-red-200 bg-red-50 p-3">
                    <p className="text-sm">
                      Property:{" "}
                      <strong className="text-red-700">
                        {property?.propertyTitle}
                      </strong>
                    </p>
                  </div>

                  <p className="text-sm text-foreground/60">
                    This action will permanently remove the property listing,
                    images, amenities, rules, bookings, and all associated data.
                    This action cannot be undone.
                  </p>
                </div>
              </AlertDialog.Body>

              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteProperty}
                  slot="close"
                  variant="danger"
                >
                  Delete Property
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};
