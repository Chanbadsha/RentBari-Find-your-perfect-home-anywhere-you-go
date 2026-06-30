import RequiredRole from "@/MiddleWare/RequiredRole";

export const metadata = {
  title: "Tenant Dashboard | RentBari",
  description:
    "Manage your bookings, saved properties, rental history, payments, and account settings through the RentBari tenant dashboard.",
};

const TenantLayout = async ({ children }) => {
  await RequiredRole("tenant");

  return <div className="w-full">{children}</div>;
};

export default TenantLayout;
