import { Lucia } from "lucia";

import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const adapter = new PrismaAdapter(client.session, client.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      // set to 'true' when using https
      secure: process.env.NODE_ENV === "production",
    },
  },
  // here we get the user attributes based on the DatabaseUserAttributes interface
  getUserAttributes: (attributes) => {
    return {
      email: attributes.email,
      username: attributes.username,
    };
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

// here we define the user attributes that we want to get from the database
// see the prisma schema for the user model
// TODO: Refactor all the user attributes to another file
interface DatabaseUserAttributes {
  username: string;
  email: string;
}
