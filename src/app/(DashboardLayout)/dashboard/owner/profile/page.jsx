import { getUserSession } from "@/app/lib/core/session";
import ProfileSettings from "@/Components/DashBoard/UserProfile";

const OwnerProfile = async () => {
  const user = await getUserSession();

  return (
    <div>
      <ProfileSettings user={user} />
    </div>
  );
};

export default OwnerProfile;
