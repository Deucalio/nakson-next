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
    // callbacks: {
    //   async session(session, token, user) {
    //     session.user = user;
    //     return session;
    //   },
    //   async jwt(token, user) {
    //     // If a user is signed in, expose additional fields in the JWT token
    //     if (user) {
    //       // token.id = user.id; // Add more fields as needed
    //       token.firstName = user.firstName;
    //       return user
    //     }
    //     return token;
    //   },
    // },
    session: {
        maxAge: 365 * 24 * 60 * 60, // 365 days
    },
});
