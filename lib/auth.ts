import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const t0 = Date.now();
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: { id: true, email: true, password: true },
        });
        console.log(`[auth] db lookup: ${Date.now() - t0}ms`);

        if (!user) return null;

        const t1 = Date.now();
        const valid = await bcrypt.compare(credentials.password, user.password);
        console.log(`[auth] bcrypt.compare: ${Date.now() - t1}ms`);

        if (!valid) return null;
        return { id: user.id, email: user.email };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
