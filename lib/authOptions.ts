import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { and, eq } from 'drizzle-orm';
import { db } from '@/database/db';
import { userTable } from '@/database/schema';

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null;
                }

                const [user] = await db
                    .select({
                        id: userTable.id,
                        email: userTable.email,
                        name: userTable.name,
                    })
                    .from(userTable)
                    .where(
                        and(
                            eq(userTable.email, credentials.email),
                            eq(userTable.password, credentials.password)
                        )
                    );

                if (!user) {
                    return null;
                }
                return user;
            },
        }),
    ],
    pages: {
        signIn: '/sign-in',
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60, // 7 Days
    },
    callbacks: {
        async signIn(params: any) {
            const { user, account, profile } = params;

            return true;
        },
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
        async jwt(params: any) {
            const { token, user, account, profile, isNewUser } = params;

            if (user) {
                token.user = user;
            }

            return token;
        },
        async session(params: any) {
            const { session, token, user } = params;

            if (token) {
                session.user = token.user;
            }

            return session;
        },
    },
};

export default authOptions;
