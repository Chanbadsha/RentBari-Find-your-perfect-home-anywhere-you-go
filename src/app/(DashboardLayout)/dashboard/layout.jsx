import RequiredRole from "@/MiddleWare/RequiredRole";
import DashboardShell from "./DashboardShell";

const DashBoardLayout = async ({ children }) => {
  await RequiredRole("");

  return <DashboardShell>{children}</DashboardShell>;
};

export default DashBoardLayout;
