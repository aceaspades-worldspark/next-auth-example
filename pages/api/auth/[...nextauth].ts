import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    {
      id: "epic",
      name: "Epic",
      type: "oauth",
      authorization: "	https://www.epicgames.com/id/authorize",
      token: "https://api.epicgames.dev/epic/oauth/v1/token",
      userinfo: "https://api.epicgames.dev/epic/oauth/v1/userInfo",
      profile(profile) {
        return {
          profile: profile,
          id: profile.id,
          // name: profile.kakao_account?.profile.nickname,
          // email: profile.kakao_account?.email,
          // image: profile.kakao_account?.profile.profile_image_url,
        };
      },
    },
    /* EmailProvider({
         server: process.env.EMAIL_SERVER,
         from: process.env.EMAIL_FROM,
       }),
    */
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
};

export default NextAuth(authOptions);
