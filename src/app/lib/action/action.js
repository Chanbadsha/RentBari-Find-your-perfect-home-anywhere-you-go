import { serverMutation } from "../core/server";

export const AddProperty = async (propertyData) => {
  console.log(propertyData, "From Add Property action");

  const result = await serverMutation("properties", propertyData);

  return result;
};
