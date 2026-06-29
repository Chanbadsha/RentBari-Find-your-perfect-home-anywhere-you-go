import React from "react";
import { Card, Input, Button, AlertDialog } from "@heroui/react";
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
  FiCheck,
  FiX,
} from "react-icons/fi";
import Image from "next/image";
import { ValidImgUrl } from "@/Utils/ValidImgUrl";
import { getUserSession } from "@/app/lib/core/session";
import {
  getAdminProperties,
  getPropertiesByUserId,
} from "@/app/lib/api/properties";
import { BiEdit } from "react-icons/bi";
import DeletePropertyBtn from "@/Utils/DeletePropertyBtn";
import Link from "next/link";
import { PropertyAction } from "./PropertyAction";

export default async function AllProperties({ searchParams }) {
  const user = await getUserSession();
  const properties = (await getAdminProperties()) || [];

  // Pagination
  const { page = "1" } = await searchParams;
  const currentPage = Number(page);
  const limit = 4;

  const start = (currentPage - 1) * limit;
  const end = start + limit;

  const paginatedProperties = properties?.slice(start, end);

  const totalPages = Math.max(1, Math.ceil(properties?.length / limit));

  // const user = await getUserSession();
  // const properties = (await getPropertiesByUserId(user?.id)) || [];

  const stats = [
    {
      title: "Total Properties",
      value: properties.length,
      badge: "+2 this month",
      badgeColor: "text-emerald-600 font-medium",
    },
    {
      title: "Monthly Revenue",
      value: "$24,500",
      badge: "↑ 8.4%",
      badgeColor: "text-emerald-600 font-medium",
    },
    {
      title: "Occupancy Rate",
      value: "92%",
      badge: "Stable",
      badgeColor: "text-amber-600 font-medium",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8 font-sans antialiased text-foreground">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Property Moderation
          </h1>
          <p className="text-foreground/70 mt-1">
            Manage and review pending property listings across the global
            network.{" "}
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#00523A] hover:bg-[#00402e] text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
          <FiPlus className="text-lg" />
          Add New Property
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Rent Price</th>

                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {paginatedProperties.length > 0 ? (
                paginatedProperties.map((property) => (
                  <tr
                    key={property._id}
                    className="hover:bg-slate-50/40 transition-colors"
                  >
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
                          <span className="text-xs text-foreground/60 font-medium">
                            {property?.propertyType}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-6 text-foreground/70 font-medium">
                      <div className="flex items-start gap-1.5 max-w-50">
                        <FiMapPin className="text-foreground/60 mt-0.5 shrink-0" />
                        <span>{property?.location}</span>
                      </div>
                    </td>

                    {/* Rent Price */}
                    <td className="py-4 px-6">
                      <span className="font-bold text-foreground">
                        {property?.rentPrice} ৳
                      </span>
                      <span className="text-xs text-foreground/60 font-medium">
                        {" "}
                        /{property?.rentType}
                      </span>
                    </td>

                    {/* Status Indicator */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full `} />
                        <span className={`font-bold text-xs `}>
                          {property?.status}
                        </span>
                      </div>
                    </td>

                    {/* Placeholder for actions */}

                    <td className="py-4 px-6">
                      <PropertyAction property={property} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20">
                    <div className="flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <FiHome className="w-8 h-8 text-slate-400" />
                      </div>

                      <h3 className="text-lg font-semibold text-foreground">
                        No Properties Found
                      </h3>

                      <p className="mt-2 text-sm text-foreground/60 max-w-sm">
                        You haven&apos;t added any properties yet. Create your
                        first property listing to start receiving bookings.
                      </p>

                      <Link
                        href="/dashboard/owner/add-property"
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#00523A] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#00402e] transition-colors"
                      >
                        <FiPlus />
                        Add Property
                      </Link>
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
