import { authClient } from "@/app/lib/auth-client";
// import { getUserSession } from "@/app/lib/core/session";
import DashBoardNavLink from "@/Utils/DashBoardNavLink";
import LogoutBtn from "@/Utils/LogoutBtn";
import { ThemeSwitch } from "@/Utils/ThemeSwitch";
import { ChartPie, CircleInfo, Gear, Heart, Persons } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaClipboardList, FaPlus, FaUsers } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";

const DashBoardNavBar = () => {
  // const user = await getUserSession();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const navItems = [
    // =========================
    // TENANT
    // =========================
    {
      path: "/dashboard/tenant",
      label: "Dashboard",
      icon: <ChartPie />,
      role: "tenant",
    },
    {
      path: "/dashboard/tenant/bookings",
      label: "My Bookings",
      icon: <FaCalendar />,
      role: "tenant",
    },
    {
      path: "/dashboard/tenant/favorites",
      label: "Favorites",
      icon: <Heart />,
      role: "tenant",
    },
    {
      path: "/dashboard/tenant/profile",
      label: "Profile",
      icon: <Persons />,
      role: "tenant",
    },

    // =========================
    // OWNER
    // =========================
    {
      path: "/dashboard/owner",
      label: "Dashboard",
      icon: <ChartPie />,
      role: "owner",
    },
    {
      path: "/dashboard/owner/properties",
      label: "My Properties",
      icon: <FaBuilding />,
      role: "owner",
    },
    {
      path: "/dashboard/owner/add-property",
      label: "Add Property",
      icon: <FaPlus />,
      role: "owner",
    },
    {
      path: "/dashboard/owner/bookings",
      label: "Bookings",
      icon: <FaCalendar />,
      role: "owner",
    },
    {
      path: "/dashboard/owner/profile",
      label: "Profile",
      icon: <Persons />,
      role: "owner",
    },

    // =========================
    // ADMIN
    // =========================
    {
      path: "/dashboard/admin",
      label: "Dashboard",
      icon: <ChartPie />,
      role: "admin",
    },
    {
      path: "/dashboard/admin/properties",
      label: "All Properties",
      icon: <FaBuilding />,
      role: "admin",
    },
    {
      path: "/dashboard/admin/users",
      label: "All Users",
      icon: <FaUsers />,
      role: "admin",
    },
    {
      path: "/dashboard/admin/bookings",
      label: "All Bookings",
      icon: <FaClipboardList />,
      role: "admin",
    },
    {
      path: "/dashboard/admin/profile",
      label: "Profile",
      icon: <Persons />,
      role: "admin",
    },
    // {
    //   path: "/dashboard/admin/reports",
    //   label: "Reports",
    //   icon: <CircleInfo />,
    //   role: "admin",
    // },
    // {
    //   path: "/dashboard/admin/settings",
    //   label: "Settings",
    //   icon: <Gear />,
    //   role: "admin",
    // },
  ];

  const filteredNavItems = navItems.filter(
    (item) => item.role === user?.userRole,
  );

  const roleStyles = {
    admin: "bg-red-100 text-red-600",
    owner: "bg-blue-100 text-blue-600",
    tenant: "bg-green-100 text-green-600",
  };

  return (
    <aside
      className="
    h-screen w-full sticky top-0 flex flex-col
    bg-linear-to-b from-[#f8fcfb] via-[#f4faf8] to-[#eef7f4]
    dark:from-[#0b0f0e] dark:via-[#0a1210] dark:to-[#070e0c]
    border-r border-[#0a5246]/10 dark:border-[#0a5246]/20
    text-slate-800 dark:text-slate-100
  "
    >
      {/* Header */}
      <div className="p-6">
        <div className="text-center">
          <h1 className="font-extrabold uppercase text-[#0a5246] dark:text-emerald-400 text-2xl">
            Rent
            <span className="text-[#0f766e] dark:text-emerald-300">Bari</span>
          </h1>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Property Management Dashboard
          </p>
        </div>
        {/* <ThemeSwitch /> */}

        {/* User Card */}
        <div className="mt-6 rounded-2xl hidden md:inline-block bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-[#0a5246]/10 dark:border-emerald-500/10 shadow-sm p-4">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src={user?.image || "/avatar.png"}
                alt={user?.name || "User"}
                width={64}
                height={64}
                className="size-16 rounded-full object-cover border-2 border-[#0a5246]/20 dark:border-emerald-500/20"
              />

              <div className="absolute bottom-0 right-0 size-4 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0b1412]" />
            </div>

            <h3 className="mt-3 font-semibold text-center truncate max-w-50 text-foreground">
              {user?.name}
            </h3>

            <span
              className={`mt-2 px-3 py-1 rounded-full text-xs font-medium capitalize border border-[#0a5246]/10 dark:border-emerald-500/20 ${
                roleStyles[user?.userRole]
              }`}
            >
              {user?.userRole}
            </span>

            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 truncate max-w-50">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col justify-between">
        <ul className="p-4 space-y-2">
          {filteredNavItems.map((navItem) => (
            <DashBoardNavLink key={navItem.path} navItem={navItem} />
          ))}
        </ul>

        {/* BOTTOM SECTION */}
        <div className="mt-auto p-4 space-y-4 border-t border-[#0a5246]/10 dark:border-emerald-500/10 bg-white/30 dark:bg-black/20">
          {/* Public Pages */}
          <div className="rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-sm border border-[#0a5246]/10 dark:border-emerald-500/10 p-3">
            <p className="text-[11px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500 mb-2 px-2">
              Public Pages
            </p>

            <div className="space-y-1">
              <Link
                href="/"
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-xl hover:bg-[#0a5246]/5 dark:hover:bg-emerald-500/10 hover:text-[#0a5246] dark:hover:text-emerald-300 transition-colors"
              >
                Home
              </Link>

              <Link
                href="/properties"
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-xl hover:bg-[#0a5246]/5 dark:hover:bg-emerald-500/10 hover:text-[#0a5246] dark:hover:text-emerald-300 transition-colors"
              >
                Properties
              </Link>

              <Link
                href="/services"
                className="flex items-center px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-xl hover:bg-[#0a5246]/5 dark:hover:bg-emerald-500/10 hover:text-[#0a5246] dark:hover:text-emerald-300 transition-colors"
              >
                Services
              </Link>
            </div>
          </div>

          {/* Logout */}
          <LogoutBtn />
        </div>
      </div>
    </aside>
  );
};

export default DashBoardNavBar;
