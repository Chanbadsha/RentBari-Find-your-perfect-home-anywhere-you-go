import React from "react";
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
import { getProperties } from "@/app/lib/api/properties";
import Link from "next/link";

export default async function DashboardOverview() {
  const properties = await getProperties();
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
      value: properties.length + " Units",
      badge: "Active",
      badgeIcon: null,
      badgeClass: "text-blue-600 bg-blue-50",
      icon: <FiHome className="text-white text-lg" />,
      iconBg: "bg-[#FDEEDC]",
    },
    {
      title: "Total Bookings",
      value: "184",
      badge: "-2.1%",
      badgeIcon: <FiArrowDownRight className="inline ml-0.5" />,
      badgeClass: "text-rose-600 bg-rose-50",
      icon: <FiCalendar className="text-white text-lg" />,
      iconBg: "bg-[#FCE4E4]",
    },
  ];

  const bookingRequests = [
    {
      name: "Alexander Pierce",
      action: "requested",
      property: "Cozy Garden Loft",
      dates: "Aug 12 - Aug 15",
      guests: "2 Guests",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    },
    {
      name: "Sarah Jenkins",
      action: "requested",
      property: "Modern Skyline Studio",
      dates: "Sep 01 - Sep 05",
      guests: "1 Guest",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
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
              <button className="text-xs font-bold text-[#00523A] hover:underline">
                View All
              </button>
            </Card.Header>

            <Card.Content className="p-0 divide-y divide-foreground/20">
              {bookingRequests.map((req, idx) => (
                <div
                  key={idx}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      height={600}
                      width={600}
                      src={req.avatar}
                      alt={req.name}
                      className="w-10 h-10 rounded-full object-cover bg-slate-100"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground/80">
                        <span className="font-bold text-foreground">
                          {req.name}
                        </span>{" "}
                        {req.action}{" "}
                        <span className="font-bold text-[#00523A]">
                          {req.property}
                        </span>
                      </p>
                      <p className="text-xs text-foreground/60 mt-1">
                        {req.dates} • {req.guests}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button className="text-xs font-bold text-rose-600 border border-rose-200 hover:bg-rose-50 px-4 py-2 rounded-xl transition-colors">
                      Decline
                    </button>
                    <button className="text-xs font-bold bg-[#00523A] hover:bg-[#00402e] text-white px-4 py-2 rounded-xl transition-colors shadow-sm">
                      Accept
                    </button>
                  </div>
                </div>
              ))}
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
