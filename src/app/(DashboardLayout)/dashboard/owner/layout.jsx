import RequiredRole from "@/MiddleWare/RequiredRole";

export const metadata = {
  title: "Owner Dashboard | RentBari",
  description:
    "Manage your properties, bookings, tenants, earnings, and account settings through the RentBari owner dashboard.",
};

const OwnerLayout = async ({ children }) => {
  await RequiredRole("owner");

  return <div className="w-full">{children}</div>;
};

export default OwnerLayout;
