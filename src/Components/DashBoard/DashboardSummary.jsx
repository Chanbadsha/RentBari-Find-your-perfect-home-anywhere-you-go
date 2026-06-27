"use client";

import { CheckCircle2, Clock } from "lucide-react";

export default function DashboardSummary({ bookings }) {
  const bookingCount = bookings?.length || 0;

  const approvedCount =
    bookings?.filter((booking) => booking?.bookingStatus === "approved")
      .length || 0;
  const pendingCount =
    bookings?.filter((booking) => booking?.bookingStatus === "pending")
      .length || 0;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* LEFT STATS */}
      <div className="grid grid-cols-2 gap-4">
        {/* APPROVED */}
        <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/30 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Approved
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-3">
            {approvedCount}
          </h2>
        </div>

        {/* PENDING */}
        <div className="rounded-2xl border border-amber-100 dark:border-amber-900/30 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center gap-2 text-amber-600">
            <Clock className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Pending
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-3">
            {pendingCount}
          </h2>
        </div>
      </div>

      {/* RIGHT FEATURE CARD */}
      <div className="">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-emerald-900 to-emerald-700 p-6 text-white shadow-lg">
          {/* Decorative building */}
          <div className="absolute right-0 bottom-0 opacity-10 text-white text-[140px] leading-none">
            🏢
          </div>

          <div className="relative z-10">
            <p className="text-xs font-bold tracking-widest text-emerald-200">
              NEXT STAY
            </p>

            <h2 className="text-2xl font-bold mt-1">Skyline Penthouse</h2>

            <p className="text-sm text-emerald-100 mt-2">
              October 12th, 2026 • 3 Nights
            </p>

            {/* optional progress bar style accent */}
            <div className="mt-4 w-40 h-1 bg-white/20 rounded-full overflow-hidden">
              <div className="w-2/3 h-full bg-white/70 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
