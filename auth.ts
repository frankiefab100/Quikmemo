// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import Twitter from "next-auth/providers/twitter";
// import GitHub from "next-auth/providers/github";


// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
// // export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [Google({
//     clientId: process.env.AUTH_GOOGLE_ID,
//     clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     authorization: {
//       params:{
//         prompt: "consent",
//         access_type: "offline",
//         response_type: "code"
//       }
//     }
//   }),
//    Twitter ({
//     clientId: process.env.AUTH_TWITTER_ID,
//     clientSecret: process.env.AUTH_TWITTER_SECRET,authorization: {
//       params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//       },
//   },
//   }),
//    GitHub({
//     clientId: process.env.AUTH_GITHUB_ID,
//     clientSecret: process.env.AUTH_GITHUB_SECRET,authorization: {
//       params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//       },
//   },
//   })],
//   pages: {
//     signIn: "/login",
//     error: "/error",
//   }
// })


import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Github({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
        authorization: {
        params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
        },
    },
    }),
   Twitter ({
    clientId: process.env.AUTH_TWITTER_ID,
    clientSecret: process.env.AUTH_TWITTER_SECRET,
  }),
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),

    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/error",
  },
});


