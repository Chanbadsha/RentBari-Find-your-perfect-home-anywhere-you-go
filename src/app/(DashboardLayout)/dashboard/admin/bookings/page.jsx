import { ValidImgUrl } from "@/Utils/ValidImgUrl";
import { getAdminProperties } from "@/app/lib/api/properties";
import { getUserSession } from "@/app/lib/core/session";
import { Card, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiHome,
  FiMapPin,
  FiPlus,
  FiSearch,
  FiSliders,
} from "react-icons/fi";
import { getUsers } from "@/app/lib/api/users";
import UserAction from "../users/UserAction";
import { getBookings } from "@/app/lib/api/bookings";
import { BookingAction } from "./BookingsAction";

export default async function Bookings({ searchParams }) {
  const bookings = (await getBookings()) || [];

  // Pagination
  const { page = "1" } = await searchParams;
  const currentPage = Number(page);
  const limit = 4;

  const start = (currentPage - 1) * limit;
  const end = start + limit;

  const paginatedBookings = bookings?.slice(start, end);

  const totalPages = Math.max(1, Math.ceil(bookings?.length / limit));

  const stats = [
    {
      title: "Total Bookings",
      value: bookings?.length || 0,
      badge: `${bookings?.filter((b) => b.status === "pending").length || 0} Pending`,
      badgeColor: "text-blue-600 font-medium",
    },
    {
      title: "Confirmed Bookings",
      value:
        bookings?.filter((b) => b.bookingStatus === "approved").length || 0,
      badge: "Approved",
      badgeColor: "text-emerald-600 font-medium",
    },
    {
      title: "Total Revenue",
      value: `৳${
        bookings
          ?.filter((b) => b.paymentStatus === "paid")
          ?.reduce((sum, booking) => sum + (booking.amount || 0), 0)
          ?.toLocaleString() || 0
      }`,
      badge: "Paid",
      badgeColor: "text-amber-600 font-medium",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8 font-sans antialiased text-foreground">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            User Directory
          </h1>
          <p className="text-foreground/70 mt-1">
            Manage all 1,248 registered users across the BashaNest ecosystem.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#00523A] hover:bg-[#00402e] text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
          <FiPlus className="text-lg" />
          Add New Property
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 w-88 md:w-full md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className="border border-foreground/20 bg-background shadow-sm rounded-2xl p-6"
          >
            <Card.Header className="p-0 pb-2">
              <Card.Description className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                {stat.title}
              </Card.Description>
            </Card.Header>
            <Card.Content className="p-0 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-foreground">
                {stat.value}
              </span>
              <span className={`text-xs ${stat.badgeColor}`}>{stat.badge}</span>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Main Table Card container */}
      <Card className="border border-foreground/20 bg-background shadow-sm rounded-2xl overflow-hidden">
        {/* Table Top Filters Header */}
        <Card.Header className="p-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-foreground/20 bg-background">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground/60 text-lg" />
            <Input
              aria-label="Search properties"
              placeholder="Search by name or role..."
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
                <th className="py-4 px-6">Tenant</th>
                <th className="py-4 px-6">Property</th>
                <th className="py-4 px-6">Owner</th>

                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {paginatedBookings.length > 0 ? (
                paginatedBookings.map((booking, ind) => (
                  <tr
                    key={ind}
                    className="hover:bg-slate-50/40 transition-colors"
                  >
                    {/* Tenant */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <Image
                          height={48}
                          width={48}
                          src={ValidImgUrl(booking?.user?.image)}
                          alt={booking?.user?.name}
                          className="w-12 h-12 rounded-xl object-cover border border-foreground/20"
                        />

                        <div>
                          <h4 className="font-bold text-foreground text-[15px] leading-tight">
                            {booking?.user?.name}
                          </h4>

                          <span className="text-xs text-foreground/60">
                            {booking?.user?.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Property */}
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-foreground">
                          {booking?.property?.propertyTitle}
                        </p>

                        <span className="text-xs text-foreground/60">
                          {booking?.property?.location}
                        </span>
                      </div>
                    </td>

                    {/* Owner */}
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-semibold text-foreground">
                          {booking?.propertyOwner?.name}
                        </p>

                        <span className="text-xs text-foreground/60">
                          {booking?.propertyOwner?.email}
                        </span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6">
                      <span
                        className={`
        inline-flex items-center rounded-full px-3 py-1 text-xs font-bold capitalize
        ${
          booking?.bookingStatus === "approved"
            ? "bg-emerald-100 text-emerald-700"
            : booking?.bookingStatus === "rejected"
              ? "bg-red-100 text-red-700"
              : booking?.bookingStatus === "pending"
                ? "bg-amber-100 text-amber-700"
                : "bg-blue-100 text-blue-700"
        }
      `}
                      >
                        {booking?.bookingStatus}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-[#00523A]">
                          ৳{booking?.amount?.toLocaleString()}
                        </span>

                        <span
                          className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                            booking?.paymentStatus === "paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {booking?.paymentStatus === "paid"
                            ? "Paid"
                            : "Unpaid"}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6">
                      <BookingAction booking={booking} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-24">
                    <div className="flex flex-col items-center justify-center text-center px-6">
                      {/* Icon */}
                      <div className="w-20 h-20 rounded-2xl bg-[#00523A]/10 flex items-center justify-center mb-5">
                        <svg
                          className="w-10 h-10 text-[#00523A]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3M5 11h14M7 21h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground">
                        No Booking Records Found
                      </h3>

                      {/* Description */}
                      <p className="mt-3 text-sm text-foreground/60 max-w-md leading-relaxed">
                        There are currently no booking transactions available
                        across the platform. New tenant booking requests and
                        completed reservations will appear here automatically.
                      </p>

                      {/* Stats */}
                      <div className="flex gap-6 mt-6 text-center">
                        <div>
                          <p className="text-2xl font-bold text-[#00523A]">0</p>
                          <p className="text-xs text-foreground/60">Pending</p>
                        </div>

                        <div>
                          <p className="text-2xl font-bold text-[#00523A]">0</p>
                          <p className="text-xs text-foreground/60">Approved</p>
                        </div>

                        <div>
                          <p className="text-2xl font-bold text-[#00523A]">0</p>
                          <p className="text-xs text-foreground/60">
                            Completed
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card.Content>

        {/* Pagination Footer */}
        <Card.Footer className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-foreground/20 bg-background">
          <span className="text-xs font-medium text-foreground/60">
            Showing{" "}
            <strong className="text-foreground/70 font-semibold">
              {bookings.length === 0 ? 0 : start + 1}-
              {Math.min(end, bookings.length)}
            </strong>{" "}
            of{" "}
            <strong className="text-foreground/70 font-semibold">
              {bookings.length}
            </strong>{" "}
            bookings
          </span>

          <div className="flex items-center gap-1">
            {/* Previous */}
            <Link
              href={`?page=${Math.max(1, currentPage - 1)}`}
              className={`p-2 border border-foreground/20 text-foreground/60 rounded-lg transition-colors ${
                currentPage === 1
                  ? "opacity-50 pointer-events-none"
                  : "hover:bg-secondary"
              }`}
            >
              <FiChevronLeft size={16} />
            </Link>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i}
                href={`?page=${i + 1}`}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                  currentPage === i + 1
                    ? "bg-secondary text-white shadow-sm"
                    : "border border-foreground/20 text-foreground/70 hover:bg-secondary"
                }`}
              >
                {i + 1}
              </Link>
            ))}

            {/* Next */}
            <Link
              href={`?page=${Math.min(totalPages, currentPage + 1)}`}
              className={`p-2 border border-foreground/20 text-foreground/60 rounded-lg transition-colors ${
                currentPage === totalPages
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
