import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        Credentials({
            async authorize(credentials: { email: string }, req: Request) {

                const user = { email: credentials.email as string };
                if (user) {
                    return user;
                }
                return null;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) token.role = user.role
            return token
        },
        session({ session, token }) {
            session.user.role = token.role
            return session
        }
    },
    session: {
        maxAge: 365 * 24 * 60 * 60, // 365 days
    },
});
