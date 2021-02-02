## Next-Prisma-Postgres

Prerequisites:

**Note**: You need [**Node.js**](https://nodejs.org/en/) (version 10.13 or later)

```bash
node -v

nvm install 14.0.0  ||  nvm use 14.0.0
```

```bash
mkdir next-prisma && cd next-prisma
```

```bash
npm init -y
```

## NextJS

```bash
yarn add next react react-dom
```

```bash
touch .gitignore && touch jsconfig.json
```

```
# .gitignore

node_modules/
.next/
.env*
!.env.sample
```

```json
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": "node_modules",
    "paths": { "@/*": ["../*"] }
  }
}
```

### Typescript (if needed)

> ```bash
> yarn add @types/node @types/react typescript -D
> ```
>
> ```json
> // package.json
>
> "scripts": {
>   "dev": "next",
>   "build": "next build",
>   "start": "next start"
> }
> ```
>
> ```bash
> mkdir pages && touch pages/index.ts
> ```

```bash
mkdir pages && touch pages/index.js
```

```jsx
// pages/index.js || pages/index.ts

const Index = () => {
  return (
    <div>
      <p>Index Page</p>
    </div>
  );
};

export default Index;
```

## Prisma

```bash
yarn add @prisma/client
```

```bash
yarn add @prisma/cli -D
```

```json
// package.json

"scripts": {
  "prisma:init": "prisma init",
  "prisma:migrate": "prisma migrate dev --preview-feature",
  "prisma:studio": "prisma studio"
}
```

```bash
yarn prisma:init
```

This will generate a:

- `/prisma` directory
- `/prisma/schema.prisma` file
- `.env`

```
✔ Your Prisma schema was created at prisma/schema.prisma.
  You can now open it in your favorite editor.

Next steps:

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql or sqlite.
3. Run yarn prisma introspect to turn your database schema into a Prisma data model.
4. Run yarn prisma generate to install Prisma Client. You can then start querying your database.

More information in our documentation:
https://pris.ly/d/getting-started
```

```
// schema.prisma

datasource db {
	provider 	= "postgresql"
	url			 	= env("DATABASE_URL")
}

generator client {
	provider	= "prisma-client-js"
}
```

```
# .env

DATABASE_URL= "postgresql://<username>:<password>@localhost:5432/<dbname>?schema=public"
```

```
// schema.prisma

model Account {
  id                 Int       @default(autoincrement()) @id
  compoundId         String    @unique @map(name: "compound_id")
  userId             Int       @map(name: "user_id")
  providerType       String    @map(name: "provider_type")
  providerId         String    @map(name: "provider_id")
  providerAccountId  String    @map(name: "provider_account_id")
  refreshToken       String?   @map(name: "refresh_token")
  accessToken        String?   @map(name: "access_token")
  accessTokenExpires DateTime? @map(name: "access_token_expires")
  createdAt          DateTime  @default(now()) @map(name: "created_at")
  updatedAt          DateTime  @default(now()) @map(name: "updated_at")

  @@index([providerAccountId], name: "providerAccountId")
  @@index([providerId], name: "providerId")
  @@index([userId], name: "userId")

  @@map(name: "accounts")
}

model Session {
  id           Int      @default(autoincrement()) @id
  userId       Int      @map(name: "user_id")
  expires      DateTime
  sessionToken String   @unique @map(name: "session_token")
  accessToken  String   @unique @map(name: "access_token")
  createdAt    DateTime @default(now()) @map(name: "created_at")
  updatedAt    DateTime @default(now()) @map(name: "updated_at")

  @@map(name: "sessions")
}

model User {
  id            Int       @default(autoincrement()) @id
  name          String?
  email         String?   @unique
  emailVerified DateTime? @map(name: "email_verified")
  image         String?
  createdAt     DateTime  @default(now()) @map(name: "created_at")
  updatedAt     DateTime  @default(now()) @map(name: "updated_at")

  @@map(name: "users")
}

model VerificationRequest {
  id         Int      @default(autoincrement()) @id
  identifier String
  token      String   @unique
  expires    DateTime
  createdAt  DateTime  @default(now()) @map(name: "created_at")
  updatedAt  DateTime  @default(now()) @map(name: "updated_at")

  @@map(name: "verification_requests")
}
```

Generate the prisma client needed to facilitate data handling.

```bash
npx @prisma/cli generate
```

**! NOTE:** Must migrate schema changes

```bash
yarn prisma:migrate
```

> **NOTE:** after each migration the prisma client is re-generated to keep in sync with the database and schema.
>
> ```
> PostgreSQL database nextprisma created at 127.0.0.1:5432
>
> ✔ Name of migration …
> The following migration(s) have been created and applied from new schema changes:
>
> migrations/
> └─ 20210129202809_/
>  └─ migration.sql
>
> ✔ Generated Prisma Client (2.15.0) to ./node_modules/@prisma/client in 1
> .10s
>
> Everything is now in sync.
> ```

Now that we have a client generated and migrated we can implement it so that we're not creating a new instance each time:

```bash
touch prisma/index.js
```

```js
// prisma/index.js

import { PrismaClient } from "@prisma/client";

export let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
```

> Now this instance can be used in each of our files to ensure we're not creating multiple connections to our database, unnecessarily.

### Middleware

```js
// prisma/middleware/logging.js

export default async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(
    `Query ${params.model}.${params.action} took ${after - before}ms`
  );

  return result;
};
```

```js
// prisma/index.js

import { PrismaClient } from "@prisma/client";
import logging from "./middleware/logging";

export let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({});

  prisma.$use(logging); // use logging middelware
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["query", "info", "warn"],
    });
    global.prisma.$use(logging); // use logging middelware
  }
  prisma = global.prisma;
  prisma.$use(logging); // use logging middelware
}
```

> This will run before each query and log out the duration of each query:
>
> ```bash
> Query User.findMany took 3ms
> Query User.findMany took 3ms
> ```

### Prisma Studio

> ```bash
> yarn prisma:studio
> ```
>
> ![image-20210130194532271](https://cdn.jsdelivr.net/gh/gaurangrshah/_shots@master/scrnshots/image-20210130194532271.png)

### Prisma Debug

```
# .env.local

DEBUG="prisma-client,engine"
```

### Seed Database

```js
// prisma/seed.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  const newUser = await prisma.user.create({
    data: {
      email: "sarah@prisma.io",
    },
  });
  console.log(`new user created`, newUser.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

```json
// package.json

"scripts": {
  "prisma:seed": "prisma db seed --preview-feature"
}
```

```bash
yarn prisma:seed
```

## Next-Auth

```bash
yarn add next-auth
```

```
# .env

GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
```

> Setup an OAuth App with github:
>
> [Developer applications (github.com)](https://github.com/settings/developers)
>
> ![image-20210201130039494](https://cdn.jsdelivr.net/gh/gaurangrshah/_shots@master/scrnshots/image-20210201130039494.png)

```bash
mkdir pages/api/auth && touch pages/api/auth[...nextauth].js
```

> **NOTE:** for some reason the file cannot be generated from the command line

```js
// pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import { prisma } from "@/prisma";

const providers = [
  Providers.GitHub({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  }),
];

const options = {
  providers,
  session: {
    jwt: true, // when true session is stored in jwt instead of database
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    // signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    secret: process.env.NEXTAUTH_SECRET || "this-should-be-a-secret",
    // custom methods allow overriding of default token encode/decode methods
    // encode: async ({ token, secret }) => await jwt.sign(token, secret),
    // decode: async ({ token, secret }) => await jwt.verify(token, secret),
  },
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
```

```bash
touch pages/_app.js
```

```jsx
// pages/_app.js

import { Provider } from "next-auth/client";

export default function App({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}
```

```js
// pages/index.js

import { signIn, signOut, useSession } from "next-auth/client";

const Index = () => {
  const [session, loading] = useSession();
  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
    </>
  );
};

export default Index;
```

```bash
mkdir pages/api/users && touch pages/api/users/index.js
```

```js
// pages/api/users/index.js

import { prisma } from "@/prisma";

export default async function handler(req, res) {
  const users = await prisma.user.findMany({});
  res.status(200).json({ name: users[0].name, users });
}
```

## Next-Connect

```bash
yarn add next-connect
```

```js
// pages/api/users/index.js

import nc from "next-connect";
import { prisma } from "@/prisma";

const handler = nc()
  // .use(someMiddleware())
  .get(async (req, res) => {
    try {
      const users = await prisma.user.findMany({});
      if (!users.length) {
        console.log("no users found");
        throw new Error("no users found");
      }
      res.status(200).json({ name: users[0].name, users });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error });
    }
  })
  .post((req, res) => {
    res.json({ hello: "world" });
  })
  .put(async (req, res) => {
    res.end("async/await is also supported!");
  })
  .patch(async (req, res) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

export default handler;
```

## Chakra-UI

```bash
yarn add @chakra-ui/icons @chakra-ui/react @chakra-ui/theme @chakra-ui/theme-tools @emotion/react @emotion/styled focus-visible framer-motion nprogress lodash.debounce
```

```bash
touch pages/_app.js && touch page/_document.js
```

```jsx
// pages/_app.js

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Provider as AuthProvider } from "next-auth/client";

import { theme } from "@/chakra";
import { ToastProvider } from "@/chakra/contexts/toast-context";
import { DefaultLayout } from "@/chakra/layouts/default";
import Footer from "@/components/chakra/footer";
import Header from "@/components/chakra/nav-bar/header";
import CustomLink from "@/components/link/custom-link";
import Nprogress from "@/components/nprogress";
import data from "@/config/setup.json";

const App = ({ Component, pageProps }) => {
  console.log(theme);
  return (
    <>
      <ChakraProvider resetCSS theme={theme}>
        <Nprogress />
        <ToastProvider>
          <AuthProvider session={pageProps.session}>
            <DefaultLayout bars={[<Header show={true} />, <Footer />]}>
              <Component {...pageProps} />
            </DefaultLayout>
          </AuthProvider>
        </ToastProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
```

```jsx
// pages/_document.js

import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";
import GoogleFonts from "next-google-fonts";

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const initialProps = await NextDocument.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='en'>
        <GoogleFonts href='https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' />
        <Head />
        <body>
          <ColorModeScript initialColorMode='light' />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
```

> **❗️NOTE:** must also copy over the following directories:
>
> (☝️*<u>links below refer to specific commits</u>*)
>
> - [/chakra](https://github.com/gaurangrshah/next-mongo-auth/tree/b43f6c4220ecf66223b0de4064eb7bbf9d498d1c/chakra)
> - [/components](https://github.com/gaurangrshah/next-mongo-auth/tree/b43f6c4220ecf66223b0de4064eb7bbf9d498d1c/components)
> - [/theme](https://github.com/gaurangrshah/next-mongo-auth/tree/b43f6c4220ecf66223b0de4064eb7bbf9d498d1c/theme)

##

### Site Config

```bash
mkdir config && touch config/setup.json
```

```json
// config/setup.json

{
  "title": "next-prisma-auth",
  "description": "Starter Template with Backend & Auth included",
  "pages": [
    { "title": "home", "prefix": null, "path": "/" },
    { "title": "tasks", "prefix": "/api", "path": "/tasks" },
    { "title": "users", "prefix": "/api", "path": "/users" },
    { "title": "posts", "prefix": "/", "path": "posts" },
    { "title": "contact", "prefix": "/", "path": "contact" },
    { "title": "dashboard", "prefix": "/", "path": "dashboard" }
  ],
  "repositoryUrl": "https://github.com/username/repo-name.git",
  "preview_branch": "staging",
  "deploy_branch": "main",
  "preview_url": "https://pathto.vercel.app/admin",
  "deploy_url": "https://pathto.vercel.app/"
}
```

### SEO

```bash
yarn add next-seo
```

```bash
touch next-seo.config.js
```

```js
// next-seo.config.js

const BASE_URL = "https://<site-path>.vercel.app";

const title = "next-prisma-auth";
const description = "Next.js FullStack";

const SEO = {
  title,
  description,
  url: `${BASE_URL}`,
  canonical: `${BASE_URL}`,
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${BASE_URL}`,
    title,
    description,
    images: [
      {
        url: `${BASE_URL}/static/images/logo.png`,
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
    site_name: `${title}`,
  },
};

export default SEO;
```

```jsx
// pages/_app.js

import { DefaultSeo } from "next-seo";

import SEO from "../next-seo.config";

const App = ({ Component, pageProps }) => {
  console.log(theme);
  return (
    <>
      <DefaultSeo {...SEO} />

      {/*...*/}
    </>
  );
};

export default App;
```

## Package Dependencies

```json
// package.json

{
  "name": "next-prisma-auth",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start",
    "prisma:init": "prisma init",
    "prisma:migrate": "prisma migrate dev --preview-feature",
    "prisma:studio": "prisma studio",
    "prisma:seed": "prisma db seed --preview-feature"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@chakra-ui/icons": "^1.0.4",
    "@chakra-ui/react": "^1.2.1",
    "@chakra-ui/theme": "^1.5.0",
    "@chakra-ui/theme-tools": "^1.0.3",
    "@emotion/react": "^11.1.4",
    "@emotion/styled": "^11.0.0",
    "@prisma/client": "^2.15.0",
    "focus-visible": "^5.2.0",
    "framer-motion": "^3.2.2-rc.1",
    "lodash.debounce": "^4.0.8",
    "next": "^10.0.6",
    "next-auth": "^3.2.0",
    "next-connect": "^0.9.1",
    "next-seo": "^4.18.0",
    "nprogress": "^0.2.0",
    "react": "^17.0.1",
    "react-dom": "^17.0.1"
  },
  "devDependencies": {
    "@prisma/cli": "^2.15.0"
  }
}
```
