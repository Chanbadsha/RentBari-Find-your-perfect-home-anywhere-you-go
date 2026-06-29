"use client";

import { authClient } from "@/app/lib/auth-client";
import { serverPatch } from "@/app/lib/core/server";

export const handleFavorite = async (propertyId) => {
  try {
    const session = await authClient.getSession();
    const user = session?.data?.user;

    if (!user) return [];

    const favorites = [...(user.favorites || [])];

    const index = favorites.indexOf(propertyId);

    if (index > -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(propertyId);
    }

    const updateData = { userId: user.id, favorites: favorites };
    await serverPatch("user", updateData);

    return favorites;
  } catch (error) {
    // console.error(error);
    return [];
  }
};
