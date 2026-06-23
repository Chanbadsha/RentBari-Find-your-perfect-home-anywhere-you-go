import { serverMutation } from "../core/server";

export const AddProperty = async (propertyData) => {
  const result = await serverMutation("properties", propertyData);

  return result;
};
