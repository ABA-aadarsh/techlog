import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Github],
  session: {
    strategy:"jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.jwt = token;
      return session;
    },
  },
})