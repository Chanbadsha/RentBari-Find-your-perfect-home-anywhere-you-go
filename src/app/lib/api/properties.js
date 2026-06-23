import { serverFetch } from "../core/server";

export const getProperties = () => {
  return serverFetch("properties") || [];
};
export const getPropertiesById = (propertyId) => {
  return serverFetch(`properties/${propertyId}`) || {};
};
