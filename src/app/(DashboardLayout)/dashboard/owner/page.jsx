import { Card } from "@heroui/react";
import {
  FiDollarSign,
  FiHome,
  FiCalendar,
  FiArrowUpRight,
  FiArrowDownRight,
  FiArrowRight,
} from "react-icons/fi";
import Image from "next/image";

import Link from "next/link";
import { getPropertiesByUserId } from "@/app/lib/api/properties";
import { getUserSession } from "@/app/lib/core/session";
import { getBookingsByOwnerId } from "@/app/lib/api/bookings";
import { ValidImgUrl } from "@/Utils/ValidImgUrl";
import BookingAccept from "@/Utils/BookingAccept";

export default async function DashboardOverview() {
  const user = await getUserSession();
  const properties = (await getPropertiesByUserId(user?.id)) || [];
  const bookingRequests =
    (await getBookingsByOwnerId(user?.id, "pending")) || [];
  const totalBookings = (await getBookingsByOwnerId(user?.id)) || [];

  const topStats = [
    {
      title: "Total Earnings",
      value: "$24,590.00",
      badge: "+12.5%",
      badgeIcon: <FiArrowUpRight className="inline ml-0.5" />,
      badgeClass: "text-emerald-600 bg-emerald-50",
      icon: <FiDollarSign className="text-white   text-lg" />,
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
      value: totalBookings.length || 0 + "",
      badge: "-2.1%",
      badgeIcon: <FiArrowDownRight className="inline ml-0.5" />,
      badgeClass: "text-rose-600 bg-rose-50",
      icon: <FiCalendar className="text-white text-lg" />,
      iconBg: "bg-[#FCE4E4]",
    },
  ];

  const chartBars = [
    { month: "Jan", height: "h-[45%]", opacity: "bg-[#00523A]/25" },
    { month: "Feb", height: "h-[65%]", opacity: "bg-[#00523A]/35" },
    { month: "Mar", height: "h-[55%]", opacity: "bg-[#00523A]/45" },
    { month: "Apr", height: "h-[80%]", opacity: "bg-[#00523A]/55" },
    { month: "May", height: "h-[75%]", opacity: "bg-[#00523A]/65" },
    { month: "Jun", height: "h-[92%]", opacity: "bg-[#00523A]" },
  ];

  return (
    <div className=" selection:bg-blue-600 selection:text-white min-h-screen bg-background text-foreground p-6 md:p-8 font-sans antialiased ">
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

      {/* Middle Section: Main Monthly Earnings Chart */}
      <Card className="border border-secondary-30 bg-background rounded-2xl p-6 shadow-sm mb-6">
        <Card.Header className="p-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
          <div>
            <Card.Title className="text-lg font-bold text-foreground">
              Monthly Earnings
            </Card.Title>
            <Card.Description className="text-xs text-foreground/60 mt-0.5">
              Performance overview for the year 2024
            </Card.Description>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button className="text-xs font-semibold px-4 py-2 border border-slate-200 rounded-xl text-slate-600 bg-slate-50/50 hover:bg-slate-50 transition-colors">
              Download PDF
            </button>
            <button className="text-xs font-semibold px-4 py-2 bg-[#00523A] text-white rounded-xl shadow-sm">
              Last 6 Months
            </button>
          </div>
        </Card.Header>

        <Card.Content className="p-0 relative h-64 w-full flex items-end justify-between gap-2 pt-4 px-2">
          {/* Custom SVG Trendline overlay to match the original layout */}
          <svg
            className="absolute inset-0 h-[85%] w-full top-6 pointer-events-none z-10"
            preserveAspectRatio="none"
            viewBox="0 0 100 100"
          >
            <path
              d="M 5,85 Q 23,52 41,63 T 77,35 L 95,35"
              fill="none"
              stroke="#00523A"
              strokeWidth="2"
            />
          </svg>

          {/* Bar Chart Bars */}
          {chartBars.map((bar, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center h-full justify-end"
            >
              <div
                className={`w-full rounded-t-xl transition-all duration-500 ${bar.height} ${bar.opacity}`}
              />
              <span className="text-[11px] font-medium text-foreground/60 mt-3">
                {bar.month}
              </span>
            </div>
          ))}
        </Card.Content>
      </Card>

      {/* Bottom Layout Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Recent Booking Requests (2 Columns Span) */}
        <Card className="lg:col-span-2 border border-foreground/20 bg-background rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <Card.Header className="p-0 flex items-center justify-between pb-4 border-b border-foreground/30">
              <Card.Title className="text-base font-bold text-foreground">
                Recent Booking Requests
              </Card.Title>
              <Link
                href="/dashboard/owner/bookings"
                className="text-xs font-bold text-[#00523A] hover:underline"
              >
                View All
              </Link>
            </Card.Header>

            <Card.Content className="p-0 divide-y divide-foreground/20">
              {bookingRequests.length > 0 ? (
                bookingRequests.map((req, idx) => (
                  <div
                    key={idx}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        height={600}
                        width={600}
                        src={ValidImgUrl(req?.property?.coverImage)}
                        alt={req?.property?.propertyTitle}
                        className="w-10 h-10 rounded-full object-cover bg-slate-100"
                      />

                      <div>
                        <p className="text-sm font-medium text-foreground/80">
                          <span className="font-bold text-foreground">
                            {req?.user?.name}
                          </span>{" "}
                          requested{" "}
                          <span className="font-bold text-[#00523A]">
                            {req?.property?.propertyTitle}
                          </span>
                        </p>
                      </div>
                    </div>

                    <BookingAccept booking={req} />
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
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.323-3.969A7.624 7.624 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground">
                    No Booking Requests
                  </h3>

                  <p className="mt-2 text-sm text-foreground/60 max-w-sm">
                    You don&apos;t have any pending booking requests at the
                    moment. New booking requests from tenants will appear here.
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
