import RequiredRole from "@/MiddleWare/RequiredRole";

const TenantLayout = async ({ children }) => {
  await RequiredRole("tenant");
  return <div className="w-full border">{children}</div>;
};

export default TenantLayout;
