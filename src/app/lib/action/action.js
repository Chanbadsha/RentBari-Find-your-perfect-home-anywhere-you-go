import { serverMutation } from "../core/server";

export const AddProperty = async (propertyData) => {
  const result = await serverMutation("properties", propertyData);

  return result;
};

export const AddBooking = async (bookingData) => {
  const result = await serverMutation("bookings", bookingData);

  return result;
};
