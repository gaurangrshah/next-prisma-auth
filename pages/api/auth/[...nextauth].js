import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { prisma } from "@/prisma";
import { email, github, credentials } from "@/next-auth";

const providers = [Providers.Email(email)];

if (process.env.GITHUB_ID) {
  // save user with github credentials
  providers.push(Providers.GitHub(github));
} else {
  // save user with local credentials
  providers.push(Providers.Credentials(credentials));
}

const options = {
  providers,
  session: {
    jwt: false, // when true session is stored in jwt instead of database
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },

  // jwt: {
  //   // signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  //   secret: process.env.NEXTAUTH_SECRET || "this-should-be-a-secret",
  //   // custom methods allow overriding of default token encode/decode methods
  //   // encode: async ({ token, secret }) => await jwt.sign(token, secret),
  //   // decode: async ({ token, secret }) => await jwt.verify(token, secret),
  // },

  // callbacks,

  database: process.env.DATABASE_URL,
  adapter: Adapters.Prisma.Adapter({ prisma }),

  // pages: {
  //   signIn: "/auth/signin",
  // },

  // Enable debug messages in the console if you are having problems
  // debug: true,
};

export default (req, res) => NextAuth(req, res, options);
