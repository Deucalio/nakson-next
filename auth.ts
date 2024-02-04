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

    session: {
        maxAge: 365 * 24 * 60 * 60, // 365 days
    },
});
