import RequiredRole from "@/MiddleWare/RequiredRole";

const AdminLayout = async ({ children }) => {
  await RequiredRole("admin");
  return <div>{children}</div>;
};

export default AdminLayout;
