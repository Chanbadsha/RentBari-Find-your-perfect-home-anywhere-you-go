import DeletePropertyBtn from "@/Utils/DeletePropertyBtn";
import { Card, Input, Button, AlertDialog } from "@heroui/react";
import { BiEdit } from "react-icons/bi";
import {
  FiPlus,
  FiSearch,
  FiSliders,
  FiDownload,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
  FiTrash2,
  FiHome,
} from "react-icons/fi";
const PropertyDelEdi = () => {
  return (
    <div className="flex items-center gap-2">
      <button
        title="Edit Property"
        className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
      >
        <BiEdit size={16} />
      </button>

      <AlertDialog>
        <Button
          variant="outline"
          title="Delete Property"
          className="p-2 outline-none border-none rounded-lg text-red-500 hover:bg-red-50 transition-colors"
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
                  Delete project permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <div className="space-y-3">
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Are you sure you want to delete this property listing?
                  </p>

                  <div className="rounded-xl border border-red-200 bg-red-50 p-3">
                    <p className="text-sm">
                      Property:{" "}
                      <strong className="font-semibold text-red-700">
                        {property.propertyTitle}
                      </strong>
                    </p>
                  </div>

                  <p className="text-sm text-foreground/60">
                    This action will permanently remove the property listing,
                    photos, amenities, house rules, and all associated
                    information from RentBari. This action cannot be undone.
                  </p>
                </div>
              </AlertDialog.Body>

              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Keep Property
                </Button>

                <DeletePropertyBtn propertyId={property._id} />
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};
