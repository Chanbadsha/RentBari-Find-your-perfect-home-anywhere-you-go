import { serverDelete, serverMutation, serverPatch } from "../core/server";

export const AddProperty = async (propertyData) => {
  const result = await serverMutation("properties", propertyData);

  return result;
};
export const UpdateProperty = async (propertyData) => {
  const { id, ...UpdateData } = propertyData;

  const result = await serverPatch(`properties/${propertyData.id}`, UpdateData);

  return result;
};
export const DeleteProperty = async (propertyId) => {
  const result = await serverDelete(`properties/${propertyId}`, {});

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
  const result = await serverPatch(`bookings/${bookingData.id}`, bookingData);

  return result;
};
export const DeleteBooking = async (bookingId) => {
  const result = await serverDelete(`bookings/${bookingId}`, {});

  return result;
};
