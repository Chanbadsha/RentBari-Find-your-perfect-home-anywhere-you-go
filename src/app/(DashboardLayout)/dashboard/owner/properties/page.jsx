import React from "react";
import { Card, Input, Button } from "@heroui/react";
import {
  FiPlus,
  FiSearch,
  FiSliders,
  FiDownload,
  FiMapPin,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

export default function MyProperties() {
  const stats = [
    {
      title: "Total Properties",
      value: "12",
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

  const properties = [
    {
      id: "BN-45092",
      name: "Azure Skyline Penthouse",
      location: "Downtown, Dubai Marina",
      price: "$4,500",
      type: "Penthouse",
      status: "Approved",
      statusColor: "bg-emerald-500",
      statusText: "text-emerald-700",
      img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=150&auto=format&fit=crop&q=60",
    },
    {
      id: "BN-12883",
      name: "Green Valley Villa",
      location: "Suburbia, Maple Avenue",
      price: "$3,200",
      type: "Family Home",
      status: "Pending",
      statusColor: "bg-amber-500",
      statusText: "text-amber-700",
      img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=150&auto=format&fit=crop&q=60",
    },
    {
      id: "BN-99201",
      name: "Urban Loft Studio",
      location: "Arts District, East End",
      price: "$1,850",
      type: "Studio",
      status: "Rejected",
      statusColor: "bg-rose-500",
      statusText: "text-rose-700",
      img: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=150&auto=format&fit=crop&q=60",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-8 font-sans antialiased text-slate-800">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            My Properties
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your real estate portfolio and track application statuses.
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
            className="border border-slate-100 bg-white shadow-sm rounded-2xl p-6"
          >
            <Card.Header className="p-0 pb-2">
              <Card.Description className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {stat.title}
              </Card.Description>
            </Card.Header>
            <Card.Content className="p-0 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-slate-900">
                {stat.value}
              </span>
              <span className={`text-xs ${stat.badgeColor}`}>{stat.badge}</span>
            </Card.Content>
          </Card>
        ))}
      </div>

      {/* Main Table Card container */}
      <Card className="border border-slate-100 bg-white shadow-sm rounded-2xl overflow-hidden">
        {/* Table Top Filters Header */}
        <Card.Header className="p-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-slate-100 bg-white">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
            <Input
              aria-label="Search properties"
              placeholder="Search by title or location..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/70 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#00523A]/20 transition-all text-sm outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 transition-all">
              <FiSliders className="text-slate-500" />
              Filters
            </button>
            <button className="flex items-center gap-2 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 transition-all">
              <FiDownload className="text-slate-500" />
              Export
            </button>
          </div>
        </Card.Header>

        {/* Properties Content Area */}
        <Card.Content className="p-0 overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <th className="py-4 px-6">Property</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Rent Price</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {properties.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/40 transition-colors"
                >
                  {/* Property Details */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-xl border border-slate-100"
                      />
                      <div>
                        <h4 className="font-bold text-slate-800 text-[15px] leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-xs text-slate-400 font-medium">
                          ID: {item.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-4 px-6 text-slate-500 font-medium">
                    <div className="flex items-start gap-1.5 max-w-[200px]">
                      <FiMapPin className="text-slate-400 mt-0.5 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </td>

                  {/* Rent Price */}
                  <td className="py-4 px-6">
                    <span className="font-bold text-slate-800">
                      {item.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {" "}
                      /mo
                    </span>
                  </td>

                  {/* Type Badge */}
                  <td className="py-4 px-6">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold max-w-[100px] truncate text-center">
                      {item.type}
                    </span>
                  </td>

                  {/* Status Indicator */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${item.statusColor}`}
                      />
                      <span className={`font-bold text-xs ${item.statusText}`}>
                        {item.status}
                      </span>
                    </div>
                  </td>

                  {/* Placeholder for actions */}
                  <td className="py-4 px-6">
                    <button className="text-slate-400 hover:text-slate-600 font-medium text-xs">
                      ...
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Content>

        {/* Pagination Footer */}
        <Card.Footer className="p-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-slate-100 bg-white">
          <span className="text-xs font-medium text-slate-400">
            Showing{" "}
            <strong className="text-slate-700 font-semibold">1-3</strong> of{" "}
            <strong className="text-slate-700 font-semibold">12</strong>{" "}
            properties
          </span>

          <div className="flex items-center gap-1">
            <button className="p-2 border border-slate-200 text-slate-400 rounded-lg hover:bg-slate-50 transition-colors">
              <FiChevronLeft size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-[#00523A] text-white rounded-lg text-xs font-semibold shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-medium transition-colors">
              3
            </button>
            <button className="p-2 border border-slate-200 text-slate-400 rounded-lg hover:bg-slate-50 transition-colors">
              <FiChevronRight size={16} />
            </button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
}
