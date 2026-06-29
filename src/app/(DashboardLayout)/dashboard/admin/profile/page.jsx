import { getUserSession } from "@/app/lib/core/session";
import ProfileSettings from "@/Components/DashBoard/UserProfile";
import React from "react";

const AdminProfile = async () => {
  const user = await getUserSession();
  return (
    <div>
      <ProfileSettings user={user} />
    </div>
  );
};

export default AdminProfile;
