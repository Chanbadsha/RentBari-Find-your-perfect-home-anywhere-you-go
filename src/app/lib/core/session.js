import { headers } from "next/headers";
import { auth } from "../auth";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user || {};
  return user;
};

// export const updateUserSession = async (data) => {
//   const session = await auth.api.getSession({
//     headers: await headers(), // you need to pass the headers object.
//   });
//   const user = session?.user || {};
//   await auth.api.updateSession({
//     headers: await headers(),
//     session: {
//       ...user,
//       ...data,
//     },
//   });
// };
