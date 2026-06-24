import DashboardSummary from "@/Components/DashBoard/DashboardSummary";
import { ValidImgUrl } from "@/Utils/ValidImgUrl";
import { getPropertiesByUserId } from "@/app/lib/api/properties";
import { getUserSession } from "@/app/lib/core/session";
import { Card, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiPlus,
  FiSearch,
  FiSliders,
} from "react-icons/fi";

export default async function TenantBookings() {
  const user = await getUserSession();
  const properties = await getPropertiesByUserId(user?.id);

  return (
    <div className="min-h-screen bg-background p-8 font-sans antialiased text-foreground">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My Bookings
          </h1>
          <p className="text-foreground/70 mt-1">
            Manage and track your upcoming and past property stays.
          </p>
        </div>
        <Link
          href={`/properties`}
          className="flex items-center gap-2 bg-[#00523A] hover:bg-[#00402e] text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
        >
          <FiPlus className="text-lg" />
          New Booking
        </Link>
      </div>

      <DashboardSummary />

      {/* Main Table Card container */}
      <Card className="border mt-4 border-foreground/20 bg-background shadow-sm rounded-2xl overflow-hidden">
        {/* Table Top Filters Header */}
        <Card.Header className="p-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-foreground/20 bg-background">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/60 text-lg" />
            <Input
              aria-label="Search properties"
              placeholder="Search by title or location..."
              className="w-full pl-10 pr-4 py-2.5 bg-background border-foreground/40 focus:border-none border rounded-xl focus:bg-background focus:ring-2 focus:ring-[#00523A]/20 transition-all text-sm outline-none placeholder:text-foreground/60"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-foreground/20 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/70 transition-all">
              <FiSliders className="text-foreground/70" />
              Filters
            </button>
            <button className="flex items-center gap-2 border border-foreground/20 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/70 transition-all">
              <FiDownload className="text-foreground/70" />
              Export
            </button>
          </div>
        </Card.Header>

        {/* Properties Content Area */}
        <Card.Content className="p-0 overflow-x-auto">
          <table className="w-full min-w-200 text-left border-collapse">
            <thead>
              <tr className="border-b border-foreground/20 bg-background text-[11px] font-bold uppercase tracking-wider text-foreground/60">
                <th className="py-4 px-6">Property</th>
                <th className="py-4 px-6">Booking Date</th>
                <th className="py-4 px-6">Amount Paid</th>

                <th className="py-4 px-6"> Booking Status</th>
                <th className="py-4 px-6"> Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-foreground/20 text-sm">
              {properties.slice(0, 3).map((property) => (
                <tr key={property._id} className=" transition-colors">
                  {/* Property Details */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <Image
                        height={600}
                        width={600}
                        src={ValidImgUrl(property?.coverImage)}
                        alt={property?.propertyTitle}
                        className="w-12 h-12 object-cover rounded-xl border border-foreground/20"
                      />
                      <div>
                        <h4 className="font-bold text-foreground text-[15px] leading-tight">
                          {property?.propertyTitle}
                        </h4>
                        {/* <span className="text-xs text-foreground/60 font-medium ">
                          {property?.propertyType} . {property?.location}
                        </span> */}
                        <p className="text-xs text-foreground/60 font-medium  truncate max-w-50">
                          {property?.propertyType} · {property?.location}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-4 px-6 text-foreground/70 font-medium">
                    <div className="max-w-50">
                      <span>
                        {new Date(property?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </td>

                  {/* Rent Price */}
                  <td className="py-4 px-6">
                    <span className="font-bold text-foreground">
                      {property?.rentPrice}$
                    </span>
                  </td>

                  {/* Status Indicator */}
                  <td className="py-4 px-6">
                    <span
                      className={`text-[11px] px-2.5 py-1 rounded-full font-semibold capitalize ${
                        property?.status === "approved"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : property?.status === "pending"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                            : property?.status === "rejected"
                              ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {property?.status}
                    </span>
                  </td>
                  {/* payment status */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {/* Dot */}
                      <span
                        className={`w-2 h-2 rounded-full ${
                          property?.status === "paid"
                            ? "bg-emerald-500"
                            : property?.status === "unpaid"
                              ? "bg-red-500"
                              : "bg-slate-400"
                        }`}
                      />

                      {/* Text */}
                      <span
                        className={`text-xs font-semibold capitalize ${
                          property?.status === "paid"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : property?.status === "unpaid"
                              ? "text-red-600 dark:text-red-400"
                              : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {property?.status}
                      </span>
                    </div>
                  </td>

                  {/* Placeholder for actions */}

                  {/* <td className="py-4 px-6">
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
                                    Are you sure you want to delete this
                                    property listing?
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
                                    This action will permanently remove the
                                    property listing, photos, amenities, house
                                    rules, and all associated information from
                                    RentBari. This action cannot be undone.
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
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Content>

        {/* Pagination Footer */}
        <Card.Footer className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-foreground/20 bg-background">
          <span className="text-xs font-medium text-foreground/60">
            Showing{" "}
            <strong className="text-foreground/70 font-semibold">1-3</strong> of{" "}
            <strong className="text-foreground/70 font-semibold">12</strong>{" "}
            properties
          </span>

          <div className="flex items-center gap-1">
            <button className="p-2 border border-foreground/20 text-foreground/60 rounded-lg hover:bg-secondary transition-colors">
              <FiChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-secondary text-white rounded-lg text-xs font-semibold shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-foreground/20 text-foreground/70 hover:bg-secondary rounded-lg text-xs font-medium transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-foreground/20 text-foreground/70 hover:bg-secondary rounded-lg text-xs font-medium transition-colors">
              3
            </button>
            <button className="p-2 border border-foreground/20 text-foreground/60 rounded-lg hover:bg-secondary transition-colors">
              <FiChevronRight size={16} />
            </button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
