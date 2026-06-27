import { getUserSession } from "@/app/lib/core/session";
import { redirect } from "next/navigation";

const DashBoardPage = async () => {
  const user = await getUserSession();

  if (!user) {
    redirect("/login");
  }

  redirect(`/dashboard/${user.userRole}`);
};

export default DashBoardPage;
