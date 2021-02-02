// import mongoose from "mongoose";
// import { validateCredentials } from "@/utils/auth";
// import dbConnect from "@/utils/mongoose";
// import Models from "@/models";

// export const callbacks = {};

// // @link: https://tinyurl.com/y6jltvz8
// callbacks.signIn = async function signIn(user, account, profile) {
//   console.log("-----SIGNIN CHECK-----");
//   // oauth providers are preconfigured, we don't have to manually do any authentication
//   if (account.type === "oauth" || account.type === "email") {
//     return Promise.resolve("/secret"); // ↩️
//   }
//   let isAllowedToLogin;
//   // allows/disallows login - based on a valid dbUser
//   isAllowedToLogin = await validateCredentials(profile).catch((e) =>
//     console.log(e)
//   );

//   if (isAllowedToLogin) {
//     console.log("-----------USER IS BEING LOGGED IN--------");
//     return Promise.resolve("/secret"); // ↩️
//   }
//   console.log("-----------USER IS NOT ALLOWED TO LOGIN--------");
//   return Promise.resolve("auth/error?error=AccessDenied"); // ↩️
//   // return Promise.resolve(false); // ↩️ using false sends to access denied page

//   /**
//    * @param  {object} user     User object
//    * @param  {object} account  Provider account
//    * @param  {object} profile  Provider profile
//    * @return {boolean}         Return `true` (or a modified JWT) to allow sign in
//    *                           Return `false` to deny access
//    */
// };

// // @link used for jwt & session: https://tinyurl.com/y3ypltj2
// callbacks.jwt = async (token, user, account, profile, isNewUser) => {
//   //   if (user) token = { id: user.id };
//   //   return token;
//   console.log("---JWT CHECK---");
//   const isSignIn = !!user;
//   if (isSignIn) {
//     console.log("-----GENERATE JWT-----");
//     token.auth_time = Number(new Date());
//     token.id = user.id;
//     console.log("-----JWT GENERATED-----");
//   }
//   return Promise.resolve(token);

//   /**
//    * @param  {object}  token     Decrypted JSON Web Token
//    * @param  {object}  user      User object      (only available on sign in)
//    * @param  {object}  account   Provider account (only available on sign in)
//    * @param  {object}  profile   Provider profile (only available on sign in)
//    * @param  {boolean} isNewUser True if new user (only available on sign in)
//    * @return {object}            JSON Web Token that will be saved
//    */
// };

// callbacks.session = async function session(...args) {
//   //   session.accessToken = token.accessToken;
//   ///  return session;
//   const [session, user] = args;

//   const { id } = session;
//   if (mongoose.connections[0].readyState !== 1) {
//     await dbConnect();
//     console.log("------DB CONNECT-----");
//   }
//   const dbUser = Models.User.findById(id)
//     .exec()
//     .catch((e) => console.log("session => err!", e));
//   //@TODO: add encoded token to session if needed

//   session.name = user.name;

//   return Promise.resolve(session);

//   /**
//    * @param  {object} session      Session object
//    * @param  {object} user         User object    (if using database sessions)
//    *                               JSON Web Token (if not using database sessions)
//    * @return {object}              Session that will be returned to the client
//    */
// };
