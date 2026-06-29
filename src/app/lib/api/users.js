import { serverFetch } from "../core/server";

// Get users
export const getUsers = async () => {
  try {
    const users = await serverFetch("users");

    return users || [];
  } catch (error) {}
};
