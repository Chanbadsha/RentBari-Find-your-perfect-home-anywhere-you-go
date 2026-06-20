import RequiredRole from "@/MiddleWare/RequiredRole";

const OwnerLayout = async ({ children }) => {
  await RequiredRole("owner");
  return <div className="w-full border">{children}</div>;
};

export default OwnerLayout;
