import RequiredRole from "@/MiddleWare/RequiredRole";

export const metadata = {
  title: "Admin Dashboard | RentBari",
  description:
    "Manage users, properties, bookings, payments, and platform activities through the RentBari administration dashboard.",
};

const AdminLayout = async ({ children }) => {
  await RequiredRole("admin");

  return <div>{children}</div>;
};

export default AdminLayout;
