import { serverFetch } from "../core/server";

const getBookings = async (query = {}) => {
  return await serverFetch("bookings", query);
};

const getBookingsById = async (bookingId) => {
  return await serverFetch(`bookings/${bookingId}`);
};

const getBookingsByPropertyId = async (propertyId) => {
  return await serverFetch(`bookings`, { propertyId });
};

const getBookingsByUserId = async (userId) => {
  return await serverFetch(`bookings`, { userId });
};

export {
  getBookings,
  getBookingsById,
  getBookingsByPropertyId,
  getBookingsByUserId,
};
