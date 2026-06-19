import { getUserSession } from "@/app/lib/core/session";
import DashBoardNavLink from "@/Utils/DashBoardNavLink";
import { ChartPie, CircleInfo, Gear, Heart, Persons } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";
import { FaCalendar, FaClipboardList, FaPlus, FaUsers } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";

const DashBoardNavBar = async () => {
  const user = await getUserSession();

  const navItems = [
    // =========================
    // TENANT
    // =========================
    {
      path: "/dashboard",
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
      path: "/dashboard/admin/reports",
      label: "Reports",
      icon: <CircleInfo />,
      role: "admin",
    },
    {
      path: "/dashboard/admin/settings",
      label: "Settings",
      icon: <Gear />,
      role: "admin",
    },
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
    <aside className="h-screen w-72 sticky top-0 border-r bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="text-center">
          <h1 className="font-extrabold uppercase text-primary text-2xl">
            Rent<span className="text-secondary">Bari</span>
          </h1>

          <p className="text-xs text-muted-foreground mt-1">
            Property Management Dashboard
          </p>
        </div>

        {/* User Card */}
        <div className="mt-6 rounded-2xl bg-mainBackground p-4">
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src={user?.image || "/avatar.png"}
                alt={user?.name || "User"}
                width={64}
                height={64}
                className="size-16 rounded-full object-cover border-2 border-primary/20"
              />

              <div className="absolute bottom-0 right-0 size-4 rounded-full bg-green-500 border-2 border-white" />
            </div>

            <h3 className="mt-3 font-semibold text-center truncate max-w-[200px]">
              {user?.name}
            </h3>

            <span
              className={`mt-2 px-3 py-1 rounded-full text-xs font-medium capitalize ${
                roleStyles[user?.userRole]
              }`}
            >
              {user?.userRole}
            </span>

            <p className="mt-2 text-xs text-muted-foreground truncate max-w-50">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col justify-between overflow-y-auto">
        <ul className="p-4 space-y-2">
          {filteredNavItems.map((navItem) => (
            <DashBoardNavLink key={navItem.path} navItem={navItem} />
          ))}
        </ul>
        {/* BOTTOM SECTION */}
        <div className="mt-auto   p-4 space-y-3">
          {/* Logout */}
          <button className="w-full mt-3 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition flex items-center justify-center gap-2">
            Logout
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <p className="text-center text-xs text-muted-foreground">
          © 2026 RentBari
        </p>
      </div>
    </aside>
  );
};

export default DashBoardNavBar;
