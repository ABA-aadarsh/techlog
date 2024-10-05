import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import jwt from "jsonwebtoken"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github],
  session: {
    strategy:"jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = jwt.sign({ email: user.email }, process.env.AUTH_SECRET);
      }
      return token;
    },
    async session({ session, token }) {
      session.jwt = token;
      return session;
    },
  },
})

