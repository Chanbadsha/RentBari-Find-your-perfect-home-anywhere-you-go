import { Card } from "@heroui/react";
import {
  FiDollarSign,
  FiHome,
  FiCalendar,
  FiArrowUpRight,
  FiArrowDownRight,
  FiArrowRight,
  FiPlus,
} from "react-icons/fi";
import Image from "next/image";

import Link from "next/link";
import { getUserSession } from "@/app/lib/core/session";
import { getBookings, getBookingsByOwnerId } from "@/app/lib/api/bookings";
import { ValidImgUrl } from "@/Utils/ValidImgUrl";
import BookingAccept from "@/Utils/BookingAccept";
import { FaUser } from "react-icons/fa";
import { getUsers } from "@/app/lib/api/users";
import { getAdminProperties, getProperties } from "@/app/lib/api/properties";
import PropertyAccept from "@/Utils/PropertyAccept";

export default async function AdminDashBoard({ searchParams }) {
  const users = await getUsers();
  const properties = (await getProperties()) || [];
  const bookings = await getBookings();

  const propertyRequests = await getAdminProperties({ status: "pending" });

  const topStats = [
    {
      title: "Total Users",
      value: users.length || 0,
      badge: "+12.5%",
      badgeIcon: <FiArrowUpRight className="inline ml-0.5" />,
      badgeClass: "text-emerald-600 bg-emerald-50",
      icon: <FaUser className="text-white   text-lg" />,
      iconBg: "bg-primary",
    },
    {
      title: "Total Properties",
      value: properties.length || 0 + " Units",
      badge: "Active",
      badgeIcon: null,
      badgeClass: "text-blue-600 bg-blue-50",
      icon: <FiHome className="text-white text-lg" />,
      iconBg: "bg-[#FDEEDC]",
    },
    {
      title: "Total Bookings",
      value: bookings.length || 0 + "",
      badge: "-2.1%",
      badgeIcon: <FiArrowDownRight className="inline ml-0.5" />,
      badgeClass: "text-rose-600 bg-rose-50",
      icon: <FiCalendar className="text-white text-lg" />,
      iconBg: "bg-[#FCE4E4]",
    },
  ];

  return (
    <div className=" selection:bg-blue-600 selection:text-white min-h-screen bg-background text-foreground p-6 md:p-8 font-sans antialiased ">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Admin Dashboard
          </h1>

          <p className="text-foreground/70 mt-1">
            Manage users, properties, bookings, and platform activities.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-[#00523A] hover:bg-[#00402e] text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
          <FiPlus className="text-lg" />
          Create User
        </button>
      </div>
      {/* Top 3 Column Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {topStats.map((stat, idx) => (
          <Card
            key={idx}
            className="
    border border-slate-200/70 dark:border-white/5
    bg-white/80 dark:bg-white/5
    backdrop-blur-sm
    rounded-2xl p-6 shadow-sm
    hover:shadow-md hover:border-[#0a5246]/20 dark:hover:border-emerald-500/20
    transition-all
  "
          >
            <Card.Header className="p-0 flex justify-between items-start pb-4">
              <div className="flex items-center justify-between w-full gap-2">
                <span className={`p-2.5 bg-primary rounded-xl  `}>
                  {stat.icon}
                </span>
                <span
                  className={`
                  
        text-[11px] font-bold px-2 py-0.5 rounded-md
        border border-slate-200 dark:border-white/10
        bg-slate-50 dark:bg-white/5
        text-slate-600 dark:text-slate-300
        flex items-center gap-1
      `}
                >
                  {stat.badge}
                  {stat.badgeIcon}
                </span>
              </div>
            </Card.Header>

            <Card.Content className="p-0">
              <Card.Description className="text-xs font-bold uppercase tracking-wider text-foreground/60 dark:text-foreground/70">
                {stat.title}
              </Card.Description>

              <Card.Title className="text-2xl font-bold text-foreground dark:text-foreground/60 mt-1">
                {stat.value}
              </Card.Title>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Bottom Layout Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Recent Booking Requests (2 Columns Span) */}
        <Card className="lg:col-span-2 border border-foreground/20 bg-background rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <Card.Header className="p-0 flex items-center justify-between pb-4 border-b border-foreground/30">
              <Card.Title className="text-base font-bold text-foreground">
                Recent Property Approval Requests
              </Card.Title>
              <Link
                href="/dashboard/admin/properties"
                className="text-xs font-bold text-[#00523A] hover:underline"
              >
                View All
              </Link>
            </Card.Header>

            <Card.Content className="p-0 divide-y divide-foreground/20">
              {propertyRequests.length > 0 ? (
                propertyRequests.map((req, idx) => (
                  <div
                    key={idx}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        height={600}
                        width={600}
                        src={ValidImgUrl(req?.user?.image)}
                        alt={req?.user?.name}
                        className="w-10 h-10 rounded-full object-cover bg-slate-100"
                      />

                      <div>
                        <p className="text-sm font-medium text-foreground/80">
                          <span className="font-bold text-foreground">
                            {req?.user?.name}
                          </span>{" "}
                          submitted{" "}
                          <span className="font-bold text-[#00523A]">
                            {req?.propertyTitle}
                          </span>{" "}
                          for approval.
                        </p>
                      </div>
                    </div>

                    <PropertyAccept property={req} />
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#00523A]/10 flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-[#00523A]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4m-9 4v5"
                      />
                    </svg>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">
                    No Property Approval Requests
                  </h3>

                  <p className="mt-2 text-sm text-foreground/60 max-w-sm">
                    There are no property listings awaiting approval right now.
                    New property submissions from owners will appear here for
                    review.
                  </p>
                </div>
              )}
            </Card.Content>
          </div>
        </Card>

        {/* Right Side: Top Performer Spotlight Card (1 Column Span) */}
        <Card className="border border-foreground/30 bg-background rounded-2xl overflow-hidden shadow-sm flex flex-col">
          <div className="relative h-44 w-full">
            <Image
              height={600}
              width={600}
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&auto=format&fit=crop&q=80"
              alt="Top Performer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#00523A] text-white text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              👑 Top Performer
            </div>
          </div>

          <Card.Content className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <Card.Title className="text-base font-bold text-foreground leading-tight">
                The Azure Retreat
              </Card.Title>
              <Card.Description className="text-xs text-foreground/60 mt-0.5">
                Ibiza, Spain
              </Card.Description>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-wider block">
                    Monthly Occupancy
                  </span>
                  <span className="text-base font-bold text-[#00523A] block mt-0.5">
                    94%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-foreground/60 uppercase tracking-wider block">
                    Revenue
                  </span>
                  <span className="text-base font-bold text-foreground block mt-0.5">
                    $8,240
                  </span>
                </div>
              </div>
            </div>

            <Card.Footer className="p-0 pt-5">
              <Link
                href={`/dashboard/owner/properties`}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs py-3 rounded-xl transition-all"
              >
                Manage Property
                <FiArrowRight size={14} />
              </Link>
            </Card.Footer>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
