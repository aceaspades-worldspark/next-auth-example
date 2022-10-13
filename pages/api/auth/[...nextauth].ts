import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    {
      id: "epic",
      name: "Epic",
      type: "oauth",
      clientId: process.env.EPIC_CLIENT_ID,
      wellKnown: "https://api.epicgames.dev/epic/oauth/v1/.well-known/openid-configuration",
      authorization: { params: { scope: "openid basic_profile", }},
      profile(profile) {
        return {
          profile: profile,
          id: profile.id,
        };
      },
    },
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
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
