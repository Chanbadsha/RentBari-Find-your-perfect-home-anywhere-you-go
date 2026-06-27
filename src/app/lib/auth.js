import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db(process.env.MONGODB_DB_NAME);
export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      userRole: { type: "string", required: true, defaultValue: "tenant" },
      favorites: { type: "array", required: true, defaultValue: [] },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
