"use client";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogoutBtn = () => {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              toast.success("User successfully logout");
              router.refresh();
            },
          },
        });
      }}
      className="w-full mt-3 px-4 py-2 rounded-xl bg-red-50 text-red-600 font-medium hover:bg-red-100 transition flex items-center justify-center gap-2"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
