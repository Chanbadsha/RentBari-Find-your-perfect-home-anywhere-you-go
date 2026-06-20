import { getUserSession } from "@/app/lib/core/session";
import { redirect } from "next/navigation";

const OwnerDashboard = async () => {
  const user = await getUserSession();
  if (!user.userRole === "owner") {
    redirect("/auth/login");
    return user;
  }
  return <div></div>;
};

export default OwnerDashboard;
