import { serverFetch } from "../core/server";

export const getProperties = (query = {}) => {
  console.log(query, "from getProperties");
  return serverFetch("properties", query) || [];
};
export const getFeaturedProperties = () => {
  return (
    serverFetch(
      "properties",
      {},
      {
        next: {
          revalidate: 300,
        },
      },
    ) || []
  );
};
export const getPropertiesById = (propertyId) => {
  return serverFetch(`properties/${propertyId}`) || {};
};
export const getPropertiesByUserId = (userId) => {
  return serverFetch(`properties`, { userId }) || [];
};
