import React from "react";
import { Card, Input } from "@heroui/react";
import {
  FiSearch,
  FiSliders,
  FiMapPin,
  FiCheck,
  FiX,
  FiEye,
  FiDownload,
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiDollarSign,
  FiPieChart,
} from "react-icons/fi";

export default function BookingRequests() {
  const stats = [
    {
      title: "Pending Requests",
      value: "12",
      bgClass: "bg-[#E6F4F0]",
      textColor: "text-[#00523A]",
      icon: <FiFileText className="text-[#00523A] text-lg" />,
    },
    {
      title: "Total Earnings",
      value: "$14,250.00",
      bgClass: "bg-[#FDF6E2]",
      textColor: "text-[#855B14]",
      icon: <FiDollarSign className="text-[#855B14] text-lg" />,
    },
    {
      title: "Occupancy Rate",
      value: "94%",
      bgClass: "bg-[#EAEAEA]",
      textColor: "text-slate-800",
      icon: <FiPieChart className="text-slate-700 text-lg" />,
    },
  ];

  const requests = [
    {
      name: "Marcus Thompson",
      email: "marcus.t@email.com",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      initials: "",
      property: "The Emerald Penthouse",
      location: "Downtown District",
      amount: "$2,450.00",
      paymentStatus: "Security Deposit Paid",
      amountColor: "text-[#00523A]",
      dates: "Oct 12 - Oct 28",
      nights: "16 Nights",
      status: "PENDING",
      statusBg: "bg-[#FDF2E2] text-[#855B14]",
    },
    {
      name: "Sarah Jenkins",
      email: "sarah.j@webmail.com",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
      initials: "",
      property: "Coastal Breeze Villa",
      location: "North Shore",
      amount: "$5,120.00",
      paymentStatus: "Full Payment Pending",
      amountColor: "text-[#00523A]",
      dates: "Nov 01 - Nov 15",
      nights: "14 Nights",
      status: "PENDING",
      statusBg: "bg-[#FDF2E2] text-[#855B14]",
    },
    {
      name: "David Alpert",
      email: "d.alpert@outlook.com",
      avatar: "",
      initials: "DA",
      property: "Sunset Loft Apartment",
      location: "Westside Meadows",
      amount: "$1,800.00",
      paymentStatus: "Paid in Full",
      amountColor: "text-[#00523A]",
      dates: "Oct 05 - Oct 12",
      nights: "7 Nights",
      status: "APPROVED",
      statusBg: "bg-[#E6F4F0] text-[#00523A]",
    },
    {
      name: "Elena Rodriguez",
      email: "elena.r@business.com",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      initials: "",
      property: "Skyline Executive Suite",
      location: "Financial District",
      amount: "$3,300.00",
      paymentStatus: "Security Deposit Paid",
      amountColor: "text-[#00523A]",
      dates: "Dec 20 - Jan 05",
      nights: "16 Nights",
      status: "PENDING",
      statusBg: "bg-[#FDF2E2] text-[#855B14]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] p-8 font-sans antialiased text-slate-800">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Booking Requests
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage incoming tenant applications and booking statuses.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              aria-label="Search tenants"
              placeholder="Search tenants..."
              className="w-full pl-9 pr-4 py-2 border border-slate-200 bg-white rounded-xl text-sm focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 shadow-sm transition-colors">
            <FiSliders className="text-slate-500" />
            Filter
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card
            key={idx}
            className={`border border-transparent ${stat.bgClass} rounded-2xl p-6 shadow-sm`}
          >
            <Card.Header className="p-0 flex justify-between items-center pb-2">
              <Card.Description
                className={`text-xs font-semibold uppercase tracking-wider ${stat.textColor} opacity-80`}
              >
                {stat.title}
              </Card.Description>
              <div>{stat.icon}</div>
            </Card.Header>
            <Card.Content className="p-0">
              <span className={`text-3xl font-bold ${stat.textColor}`}>
                {stat.value}
              </span>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Main Container Card */}
      <Card className="border border-slate-100 bg-white shadow-sm rounded-2xl overflow-hidden">
        {/* Responsive Table Wrapper */}
        <Card.Content className="p-0 overflow-x-auto">
          <table className="w-full min-w-[950px] text-left border-collapse">
            <thead>
              <tr className="bg-[#F4F6F5] text-xs font-bold tracking-wide text-slate-500 border-b border-slate-100">
                <th className="py-4 px-6 w-[25%]">Tenant Info</th>
                <th className="py-4 px-6 w-[25%]">Property Name</th>
                <th className="py-4 px-6 w-[15%]">Amount</th>
                <th className="py-4 px-6 w-[15%]">Date Range</th>
                <th className="py-4 px-6 w-[10%] text-center">Status</th>
                <th className="py-4 px-6 w-[10%] text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {requests.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  {/* Tenant Info */}
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      {row.avatar ? (
                        <img
                          src={row.avatar}
                          alt={row.name}
                          className="w-10 h-10 object-cover rounded-full bg-slate-100"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#D1EBE3] text-[#00523A] font-bold text-xs flex items-center justify-center">
                          {row.initials}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm leading-tight">
                          {row.name}
                        </h4>
                        <span className="text-xs text-slate-400">
                          {row.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Property Name */}
                  <td className="py-5 px-6">
                    <div>
                      <h4 className="font-semibold text-slate-700 text-sm leading-tight">
                        {row.property}
                      </h4>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                        <FiMapPin className="shrink-0" />
                        <span>{row.location}</span>
                      </div>
                    </div>
                  </td>

                  {/* Amount */}
                  <td className="py-5 px-6">
                    <div>
                      <span className={`font-bold ${row.amountColor}`}>
                        {row.amount}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                        {row.paymentStatus}
                      </p>
                    </div>
                  </td>

                  {/* Date Range */}
                  <td className="py-5 px-6">
                    <div>
                      <span className="font-semibold text-slate-700">
                        {row.dates}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {row.nights}
                      </p>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-5 px-6 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider ${row.statusBg}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  {/* Actions column conditional layout */}
                  <td className="py-5 px-6">
                    <div className="flex items-center justify-center gap-3">
                      {row.status === "PENDING" ? (
                        <>
                          <button className="flex items-center gap-1.5 bg-[#00523A] hover:bg-[#00402e] text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-sm">
                            <FiCheck /> Approve
                          </button>
                          <button className="text-rose-500 hover:text-rose-700 transition-colors p-1">
                            <FiX size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                            <FiEye size={16} />
                          </button>
                          <button className="text-slate-400 hover:text-slate-600 transition-colors p-1">
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
        <Card.Footer className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 bg-white">
          <span className="text-xs font-medium text-slate-400">
            Showing{" "}
            <strong className="text-slate-600 font-semibold">1 to 4</strong> of{" "}
            <strong className="text-slate-600 font-semibold">12</strong>{" "}
            requests
          </span>

          <div className="flex items-center gap-1">
            <button className="p-2 border border-slate-200 text-slate-400 rounded-lg hover:bg-slate-50 transition-colors">
              <FiChevronLeft size={14} />
            </button>
            <button className="w-7 h-7 flex items-center justify-center bg-[#00523A] text-white rounded-lg text-xs font-semibold shadow-sm">
              1
            </button>
            <button className="w-7 h-7 flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors">
              2
            </button>
            <button className="w-7 h-7 flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors">
              3
            </button>
            <button className="p-2 border border-slate-200 text-slate-400 rounded-lg hover:bg-slate-50 transition-colors">
              <FiChevronRight size={14} />
            </button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
