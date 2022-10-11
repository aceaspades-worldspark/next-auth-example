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
  secret: process.env.SECRET,
  providers: [
    {
      id: "epic",
      name: "Epic",
      type: "oauth",
      version: "2.0",
      clientId: process.env.EPIC_CLIENT_ID,
      wellKnown: "https://api.epicgames.dev/epic/oauth/v1/.well-known/openid-configuration",
      authorization: {
        url: "https://www.epicgames.com/id/authorize",
        params: {
          client_id: process.env.EPIC_CLIENT_ID,
          response_type: "code",
          scope: "basic_profile",
          state: "abc123"
        }
      },
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
