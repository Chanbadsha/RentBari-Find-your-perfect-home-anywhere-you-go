import { getBookingsByOwnerId } from "@/app/lib/api/bookings";
import { getProperties } from "@/app/lib/api/properties";
import { getUserSession } from "@/app/lib/core/session";
import BookingAccept from "@/Utils/BookingAccept";
import { Card, Input } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import {
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiDollarSign,
  FiDownload,
  FiEye,
  FiFileText,
  FiMapPin,
  FiPieChart,
  FiSearch,
  FiSliders,
  FiX,
} from "react-icons/fi";

export default async function BookingRequests({ searchParams }) {
  const user = await getUserSession();
  const properties = await getProperties();
  const bookings = await getBookingsByOwnerId(user?.id);
  const bookingRequest = await getBookingsByOwnerId(user?.id, "pending");
  console.log(bookingRequest);
  // Pagination
  const { page = "1" } = await searchParams;
  const currentPage = Number(page);
  const limit = 4;

  const start = (currentPage - 1) * limit;
  const end = start + limit;

  const paginatedProperties = bookings.slice(start, end);

  const totalPages = Math.max(1, Math.ceil(bookings.length / limit));
  const startDate = new Date();

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 7);
  const bookingStatusStyles = {
    approved: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    pending: "bg-amber-100 text-amber-700 border border-amber-200",
    refund: "bg-rose-100 text-rose-700 border border-rose-200",
  };

  const stats = [
    {
      title: "Pending Requests",
      value: bookingRequest?.length || 0,
      bgClass: "bg-secondary",
      textColor: "text-white",
      icon: <FiFileText className="text-foreground/80 text-lg" />,
    },
    {
      title: "Total Earnings",
      value: "$14,250.00",
      bgClass: "bg-secondary",
      textColor: "text-white",
      icon: <FiDollarSign className="text-foreground/80 text-lg" />,
    },
    {
      title: "Occupancy Rate",
      value: "94%",
      bgClass: "bg-secondary",
      textColor: "text-foreground",
      icon: <FiPieChart className="text-foreground/80 text-lg" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8 font-sans antialiased text-foreground">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Booking Requests
          </h1>
          <p className="text-foreground/60 text-sm mt-1">
            Manage incoming tenant applications and booking statuses.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60" />
            <Input
              aria-label="Search tenants"
              placeholder="Search tenants..."
              className="w-full pl-9 pr-4 py-2 border border-foreground/20 bg-background rounded-xl text-sm focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 border border-foreground/20 bg-background hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-medium text-foreground/80 shadow-sm transition-colors">
            <FiSliders className="text-foreground/60" />
            Filter
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className={`border flex justify-center items-center  border-foreground/20 bg-background rounded-2xl p-6 shadow-sm`}
          >
            <Card.Header className="p-0 flex justify-between items-center pb-2">
              <Card.Description
                className={`text-xs font-semibold uppercase tracking-wider  opacity-80`}
              >
                {stat.title}
              </Card.Description>
              <div>{stat.icon}</div>
            </Card.Header>
            <Card.Content className="p-0">
              <span className={`text-3xl font-bold `}>{stat.value}</span>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Main Container Card */}
      <Card className="border border-foreground/20 bg-background shadow-sm rounded-2xl overflow-hidden">
        {/* Responsive Table Wrapper */}
        <Card.Content className="p-0 overflow-x-auto">
          <table className="w-full min-w-237.5 text-left border-collapse">
            <thead>
              <tr className="bg-background text-xs font-bold tracking-wide text-foreground/60 border-b border-foreground/20">
                <th className="py-4 px-6 w-[25%]">Tenant Info</th>
                <th className="py-4 px-6 w-[25%]">Property Name</th>
                <th className="py-4 px-6 w-[15%]">Amount</th>
                <th className="py-4 px-6 w-[15%]">Date Range</th>
                <th className="py-4 px-6 w-[10%] text-center">Status</th>
                <th className="py-4 px-6 w-[10%] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {paginatedProperties.map((property, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {/* Tenant Info */}
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      {property?.user?.image ? (
                        <Image
                          height={600}
                          width={600}
                          src={property?.user?.image}
                          alt={property?.user?.name}
                          className="w-10 h-10 object-cover rounded-full bg-slate-100"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#D1EBE3] text-[#00523A] font-bold text-xs flex items-center justify-center">
                          {/* {row.initials} */}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-foreground text-sm leading-tight">
                          {property?.user?.name}
                        </h4>
                        <span className="text-xs text-foreground/60">
                          {property?.user?.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Property Name */}
                  <td className="py-5 px-6">
                    <div>
                      <h4 className="font-semibold text-foreground/80 text-sm leading-tight">
                        {property?.property?.propertyTitle}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-foreground/60 mt-1">
                        <FiMapPin className="shrink-0" />
                        <span>{property?.property?.location}</span>
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-5 px-6">
                    <div>
                      <span className={`font-bold `}>
                        {" "}
                        ৳ {property?.amount}
                      </span>
                      <p className="text-[11px] text-foreground/60 mt-0.5 font-medium">
                        {property?.paymentStatus}
                      </p>
                    </div>
                  </td>

                  {/* Date Range */}

                  <td className="py-5 px-6">
                    <div>
                      <span className="font-semibold text-foreground/80">
                        {startDate.toLocaleDateString()}
                      </span>
                      <p className="text-[11px] text-foreground/60 mt-0.5">
                        Until {endDate.toLocaleDateString()}
                      </p>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-5 px-6 text-center">
                    <span
                      className={`inline-block capitalize px-3 py-1 rounded-md text-[10px] font-bold tracking-wider ${
                        bookingStatusStyles[property?.bookingStatus] ||
                        "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {property?.bookingStatus}
                    </span>
                  </td>

                  {/* Actions column conditional layout */}
                  <td className="py-5 px-6">
                    <div className="flex items-center justify-center gap-3">
                      {property?.bookingStatus === "pending" ? (
                        <>
                          <BookingAccept booking={property} />
                        </>
                      ) : (
                        <>
                          <button className="text-foreground/60 hover:text-foreground/70 transition-colors p-1">
                            <FiEye size={16} />
                          </button>
                          <button className="text-foreground/60 hover:text-foreground/70 transition-colors p-1">
                            <FiDownload size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Content>

        {/* Dynamic Pagination Footer */}
        <Card.Footer className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-foreground/20 bg-background">
          <span className="text-xs font-medium text-foreground/60">
            Showing{" "}
            <strong className="text-foreground/70 font-semibold">
              {properties.length === 0 ? 0 : start + 1}-
              {Math.min(end, properties.length)}
            </strong>{" "}
            of{" "}
            <strong className="text-foreground/70 font-semibold">
              {properties.length}
            </strong>{" "}
            properties
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
