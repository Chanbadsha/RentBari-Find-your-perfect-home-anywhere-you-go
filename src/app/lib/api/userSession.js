"use client";

import { authClient } from "../auth-client";

export const updateUserSession = async (data) => {
  try {
    const session = await authClient.getSession();

    if (!session?.data?.user) return;

    await authClient.updateUser({
      ...data,
    });
  } catch (error) {}
};
