import { prisma } from "@/prisma/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: String(profile.id),
          name: profile.login,
          image: profile.avatar_url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        // @ts-ignore
        session.user.id = user.id;

        // Fetch the numSearches field from the database
        const userInfo = await prisma.user.findUnique({
          where: { id: user.id },
          select: { numSearches: true, image: true }, // Include any other fields you need
        });

        // Include numSearches and other fields in the session object
        if (userInfo) {
          session.user.numSearches = userInfo.numSearches;
          session.user.image = userInfo.image;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
