import { prisma } from "@/prisma";

export const email = {
  server: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  },
  from: process.env.SMTP_FROM, // The "from" address that you want to use
};

export const github = {
  clientId: process.env.GITHUB_ID,
  clientSecret: process.env.GITHUB_SECRET,
};

export const credentials = {
  // The name to display on the sign in form (e.g. 'Sign in with...')
  name: "Credentials",
  // The credentials is used to generate a suitable form on the sign in page.
  // You can specify whatever fields you are expecting to be submitted.
  // e.g. domain, username, password, 2FA token, etc.
  credentials: {
    username: { label: "Username", type: "text", placeholder: "jsmith" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    // Add logic here to look up the user from the credentials supplied
    // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" };
    const user = await prisma.user.findUnique({
      where: {email: credentials.email}
    })

    if (user) {
      // Any object returned will be saved in `user` property of the JWT
      return user;
    } else {
      // If you return null or false then the credentials will be rejected
      return null;
      // You can also Reject this callback with an Error or with a URL:
      // throw new Error('error message') // Redirect to error page
      // throw '/path/to/redirect'        // Redirect to a URL
    }
  },
};
