import { getUserSession } from "@/app/lib/core/session";
import { redirect } from "next/navigation";

const RequiredRole = async (role = null) => {
  const user = await getUserSession();

  if (!user?.id) {
    redirect("/auth/login");
  }

  if (role && user?.userRole !== role) {
    redirect(`/dashboard/${user.userRole}`);
  }
  return;
};

export default RequiredRole;
