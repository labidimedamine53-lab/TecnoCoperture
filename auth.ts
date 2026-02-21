import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

const credentialsSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

const adminUsername = process.env.ADMIN_USERNAME ?? "admin";
const adminPassword = process.env.ADMIN_PASSWORD ?? "change-me-now";
const adminEmail = process.env.ADMIN_EMAIL ?? "admin@tecnocoperture.it";

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { username, password } = parsed.data;
        if (username !== adminUsername || password !== adminPassword) {
          return null;
        }

        return {
          id: "admin-user",
          name: "Amministratore",
          email: adminEmail,
          role: "ADMIN",
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: "ADMIN" }).role ?? "ADMIN";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role === "ADMIN" ? "ADMIN" : "ADMIN";
      }
      return session;
    },
  },
});
