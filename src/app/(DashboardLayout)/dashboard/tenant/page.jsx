import React from "react";
import { Card } from "@heroui/react";
import {
  FiPlus,
  FiHome,
  FiHeart,
  FiCalendar,
  FiMapPin,
  FiWifi,
  FiTv,
  FiPhone,
  FiMessageSquare,
  FiHelpCircle,
  FiGift,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function TenantDashboard() {
  const stats = [
    {
      title: "Total Bookings",
      value: "12",
      badge: "+2 this month",
      badgeColor: "text-emerald-700",
      icon: <FiHome className="text-emerald-700 text-lg" />,
      iconBg: "bg-[#CCECE3]",
    },
    {
      title: "Favorites",
      value: "28",
      badge: "Saved Items",
      badgeColor: "text-foreground/70",
      icon: <FiHeart className="text-amber-700 text-lg fill-amber-700" />,
      iconBg: "bg-[#FDEEDC]",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6 md:p-8 font-sans antialiased text-foreground">
      {/* Welcome & Header Action Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">
            Welcome back, Alex!
          </h1>
          <p className="text-foreground/70 text-sm mt-1">
            Your next adventure is just around the corner. Here&apos;s a look at
            your stay details.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#00523A] hover:bg-[#00402e] text-white px-5 py-3 rounded-xl font-bold text-sm transition-colors shadow-sm self-stretch sm:self-auto justify-center">
          <FiPlus className="text-base" />
          New Booking
        </button>
      </div>

      {/* Grid containing Stats and Next Stay Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left Side: Stats column wrapper (Spans 2 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-2">
          {stats.map((stat, idx) => (
            <Card
              key={idx}
              className="border border-emerald-100 dark:border-emerald-900/30 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
            >
              <Card.Header className="p-0  flex  justify-between items-start pb-6">
                <div className="w-full flex justify-between">
                  <span className={`p-2.5 rounded-xl ${stat.iconBg}`}>
                    {stat.icon}
                  </span>
                  <span className={`text-[11px] font-bold ${stat.badgeColor}`}>
                    {stat.badge}
                  </span>
                </div>
              </Card.Header>
              <Card.Content className="p-0">
                <Card.Description className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                  {stat.title}
                </Card.Description>
                <Card.Title className="text-3xl font-black text-foreground mt-1">
                  {stat.value}
                </Card.Title>
              </Card.Content>
            </Card>
          ))}
        </div>

        {/* Right Side: Next Stay Highlight Micro-Card (Spans 1 column) */}
        <Card className="bg-[#00523A] text-white rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-45">
          <Card.Header className="p-0 flex space-y-2 justify-between items-start">
            <span className="p-2.5 bg-background/10 rounded-xl">
              <FiCalendar className="text-white text-lg" />
            </span>
            <span className="text-[10px] font-bold bg-background/10 text-white px-2.5 py-0.5 rounded-full">
              In 4 Days
            </span>
          </Card.Header>
          <Card.Content className="p-0 mt-6">
            <Card.Description className="text-[10px] font-bold uppercase tracking-widest text-white">
              Next Stay
            </Card.Description>
            <Card.Title className="text-xl font-bold mt-0.5 leading-tight text-white">
              Ocean Breeze Villa
            </Card.Title>
          </Card.Content>
          <Card.Footer className="p-0 mt-1 text-xs text-white/80 font-medium">
            Dec 12 - Dec 18, 2024
          </Card.Footer>
        </Card>
      </div>

      {/* Upcoming Stays Detailed Item Card */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Upcoming Stays</h3>
          <Link
            href={`/dashboard/tenant/bookings`}
            className="text-xs font-bold text-[#00523A] hover:text-green-400 hover:underline"
          >
            View All Bookings
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <Card className="border border-foreground/30 bg-background rounded-2xl p-4 shadow-sm">
            <Card.Content className="p-0 flex flex-col md:flex-row gap-5 items-stretch">
              {/* Aspect Ratio Controlled Image */}
              <div className="relative w-full md:w-72 h-44 rounded-xl overflow-hidden shrink-0">
                <Image
                  height={600}
                  width={600}
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80"
                  alt="Ocean Breeze Villa & Spa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#00523A] text-white text-[9px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                  Confirmed
                </div>
              </div>

              {/* Content Details side */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-teal-600 uppercase tracking-wider">
                    <FiMapPin />
                    <span>Malibu, California</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-foreground mt-1">
                    Ocean Breeze Villa & Spa
                  </h4>
                  <p className="text-xs text-foreground/70 font-medium mt-1.5">
                    📅 Dec 12 - 18, 2024 &nbsp;•&nbsp; 👥 2 Guests
                  </p>
                </div>

                {/* Amenities Tags & Row Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-foreground/30">
                  <div className="flex items-center gap-2 text-foreground/70">
                    <div className="p-1.5 bg-slate-50 border border-foreground/30 rounded-lg">
                      <FiWifi size={14} />
                    </div>
                    <div className="p-1.5 bg-slate-50 border border-foreground/30 rounded-lg">
                      <FiTv size={14} />
                    </div>
                    <span className="text-[11px] font-bold text-foreground/70 bg-slate-50 border border-foreground/30 px-2 py-0.5 rounded-lg">
                      +4
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-xs font-bold border border-slate-200 hover:bg-secondary text-foreground/70 px-4 py-2 rounded-xl transition-colors">
                      Manage
                    </button>
                    <button className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-black px-4 py-2 rounded-xl transition-colors">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>

              {/* Absolute Pricing Side Area */}
              <div className="text-right flex flex-col justify-start md:justify-center items-end md:border-l md:border-foreground/30 md:pl-6 min-w-30">
                <span className="text-xl font-black text-foreground">
                  $1,450.00
                </span>
                <span className="text-[10px] font-bold text-foreground/70 mt-0.5">
                  Paid in Full
                </span>
              </div>
            </Card.Content>
          </Card>
          <Card className="border border-foreground/30 bg-background rounded-2xl p-4 shadow-sm">
            <Card.Content className="p-0 flex flex-col md:flex-row gap-5 items-stretch">
              {/* Aspect Ratio Controlled Image */}
              <div className="relative w-full md:w-72 h-44 rounded-xl overflow-hidden shrink-0">
                <Image
                  height={600}
                  width={600}
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80"
                  alt="Ocean Breeze Villa & Spa"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#00523A] text-white text-[9px] font-bold px-2.5 py-1 rounded-md shadow-sm">
                  Confirmed
                </div>
              </div>

              {/* Content Details side */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-teal-600 uppercase tracking-wider">
                    <FiMapPin />
                    <span>Malibu, California</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-foreground mt-1">
                    Ocean Breeze Villa & Spa
                  </h4>
                  <p className="text-xs text-foreground/70 font-medium mt-1.5">
                    📅 Dec 12 - 18, 2024 &nbsp;•&nbsp; 👥 2 Guests
                  </p>
                </div>

                {/* Amenities Tags & Row Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-foreground/30">
                  <div className="flex items-center gap-2 text-foreground/70">
                    <div className="p-1.5 bg-slate-50 border border-foreground/30 rounded-lg">
                      <FiWifi size={14} />
                    </div>
                    <div className="p-1.5 bg-slate-50 border border-foreground/30 rounded-lg">
                      <FiTv size={14} />
                    </div>
                    <span className="text-[11px] font-bold text-foreground/70 bg-slate-50 border border-foreground/30 px-2 py-0.5 rounded-lg">
                      +4
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-xs font-bold border border-slate-200 hover:bg-secondary text-foreground/70 px-4 py-2 rounded-xl transition-colors">
                      Manage
                    </button>
                    <button className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-black px-4 py-2 rounded-xl transition-colors">
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>

              {/* Absolute Pricing Side Area */}
              <div className="text-right flex flex-col justify-start md:justify-center items-end md:border-l md:border-foreground/30 md:pl-6 min-w-30">
                <span className="text-xl font-black text-foreground">
                  $1,450.00
                </span>
                <span className="text-[10px] font-bold text-foreground/70 mt-0.5">
                  Paid in Full
                </span>
              </div>
            </Card.Content>
          </Card>
        </div>
      </div>

      {/* Bottom Promotional / Customer Help Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Refer a Friend Banner Card */}
        <Card className="bg-[#6A3B2A] text-white rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-40">
          <div>
            <Card.Title className="text-lg text-white font-bold">
              Refer a Friend
            </Card.Title>
            <Card.Description className="text-xs text-slate-200 mt-1.5 max-w-xs leading-relaxed">
              Share RentBari with your network and earn $50 in credits for every
              successful booking.
            </Card.Description>
          </div>
          <Card.Footer className="p-0 mt-4">
            <button className="text-xs font-bold bg-secondary  text-white px-5 py-2.5 rounded-xl transition-transform hover:scale-[1.02]">
              Invite Now
            </button>
          </Card.Footer>
          {/* Subtle Background Icon decoration watermark */}
          <FiGift className="absolute -bottom-2.5 -right-2.5 text-foreground/10 w-24 h-24 pointer-events-none" />
        </Card>

        {/* 24/7 Concierge Support Card */}
        <Card className="bg-[#E6EAE7] border border-transparent rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-40">
          <div className="flex justify-between items-start gap-4">
            <div>
              <Card.Title className="text-lg  font-bold text-[#181c1b]">
                Need Help?
              </Card.Title>
              <Card.Description className="text-xs text-[#181c1b] mt-1.5 max-w-xs leading-relaxed">
                Our 24/7 concierge is ready to assist you with any questions.
              </Card.Description>
            </div>

            {/* Circular Help Agent Avatar badge replacement */}
            <div className="w-12 h-12 rounded-full bg-white text-[#00523A] flex items-center justify-center shrink-0">
              <FiPhone size={20} className="scale-x-[-1]" />
            </div>
          </div>

          <Card.Footer className="p-0 mt-4 flex items-center gap-2">
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#00523A] hover:bg-slate-50 shadow-sm border border-foreground/30 transition-colors">
              <FiPhone size={14} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#00523A] hover:bg-slate-50 shadow-sm border border-foreground/30 transition-colors">
              <FiMessageSquare size={14} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#00523A] hover:bg-slate-50 shadow-sm border border-foreground/30 transition-colors">
              <FiHelpCircle size={14} />
            </button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
