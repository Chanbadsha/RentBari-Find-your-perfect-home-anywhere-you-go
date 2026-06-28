import { serverMutation, serverPatch } from "../core/server";

export const AddProperty = async (propertyData) => {
  const result = await serverMutation("properties", propertyData);

  return result;
};

export const AddBooking = async (bookingData) => {
  const result = await serverMutation("bookings", bookingData);

  return result;
};

export const UpdateUserSession = async (userData) => {
  const result = await serverPatch("user", userData);

  return result;
};

export const UpdateBooking = async (bookingData) => {
  // console.log(bookingData);
  const result = await serverPatch(`bookings/${bookingData.id}`, bookingData);

  return result;
};
