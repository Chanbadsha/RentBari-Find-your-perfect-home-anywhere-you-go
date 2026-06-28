import DashboardSummary from "@/Components/DashBoard/DashboardSummary";
import { ValidImgUrl } from "@/Utils/ValidImgUrl";
import { getBookingsByUserId } from "@/app/lib/api/bookings";
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

export default async function TenantBookings({ searchParams }) {
  const user = await getUserSession();

  const bookings = await getBookingsByUserId(user?.id);
  const { page = 1 } = await searchParams;

  console.log(page);
  const limit = 3;

  const start = (page - 1) * limit;
  const end = start + limit;
  console.log(start);
  const paginatedBookings = bookings.slice(start, end);

  const totalPages = Math.ceil(bookings.length / limit);

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

      <DashboardSummary bookings={bookings} />

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
              {paginatedBookings.map((booking) => (
                <tr key={booking?.property._id} className=" transition-colors">
                  {/* Property Details */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <Image
                        height={600}
                        width={600}
                        src={ValidImgUrl(booking?.property?.coverImage)}
                        alt={booking?.property?.propertyTitle}
                        className="w-12 h-12 object-cover rounded-xl border border-foreground/20"
                      />
                      <div>
                        <h4 className="font-bold text-foreground text-[15px] leading-tight">
                          {booking?.property?.propertyTitle}
                        </h4>
                        {/* <span className="text-xs text-foreground/60 font-medium ">
                          {property?.propertyType} . {property?.location}
                        </span> */}
                        <p className="text-xs text-foreground/60 font-medium  truncate max-w-50">
                          {booking?.property?.propertyType} ·{" "}
                          {booking?.property?.location}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-4 px-6 text-foreground/70 font-medium">
                    <div className="max-w-50">
                      <span>
                        {new Date(booking?.createdAt).toLocaleDateString(
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
                      {booking?.property?.rentPrice}$
                    </span>
                  </td>

                  {/* Status Indicator */}
                  <td className="py-4 px-6">
                    <span
                      className={`text-[11px] px-2.5 py-1 rounded-full font-semibold capitalize ${
                        booking?.bookingStatus === "approved"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : booking?.bookingStatus === "pending"
                            ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                            : booking?.bookingStatus === "rejected"
                              ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300"
                      }`}
                    >
                      {booking?.bookingStatus}
                    </span>
                  </td>
                  {/* payment status */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {/* Dot */}
                      <span
                        className={`w-2 h-2 rounded-full ${
                          booking?.paymentStatus === "paid"
                            ? "bg-emerald-500"
                            : booking?.paymentStatus === "unpaid"
                              ? "bg-red-500"
                              : "bg-slate-400"
                        }`}
                      />

                      {/* Text */}
                      <span
                        className={`text-xs font-semibold capitalize ${
                          booking?.paymentStatus === "paid"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : booking?.paymentStatus === "unpaid"
                              ? "text-red-600 dark:text-red-400"
                              : "text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {booking?.paymentStatus}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Content>

        {/* Pagination Footer */}
        <Card.Footer className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-foreground/20 bg-background">
          <span className="text-xs font-medium text-foreground/60">
            Showing
            <strong>
              {Math.min(start + 1, bookings.length)}-
              {Math.min(end, bookings.length)}
            </strong>
            of
            <strong> {bookings.length}</strong>
            bookings
          </span>

          <div className="flex items-center gap-1">
            <Link
              href={`?page=${Math.max(page - 1, 1)}`}
              className={`p-2 border border-foreground/20 rounded-lg ${
                page === 1
                  ? "opacity-50 pointer-events-none"
                  : "hover:bg-secondary"
              }`}
            >
              <FiChevronLeft size={16} />
            </Link>

            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i}
                href={`?page=${i + 1}`}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium ${
                  page === i + 1
                    ? "bg-secondary text-white"
                    : "border border-foreground/20 hover:bg-secondary"
                }`}
              >
                {i + 1}
              </Link>
            ))}

            <Link
              href={`?page=${Math.min(page + 1, totalPages)}`}
              className={`p-2 border border-foreground/20 rounded-lg ${
                page === totalPages
                  ? "opacity-50 pointer-events-none"
                  : "hover:bg-secondary"
              }`}
            >
              <FiChevronRight size={16} />
            </Link>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
