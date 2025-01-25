// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

interface ExtendedUser extends User {
    role?: string;
    clientId: string;
    supabaseId: string;
    name: string;
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "hello@example.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials): Promise<ExtendedUser | null> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing credentials')
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    },
                })

                if (!user || !user.password) {
                    throw new Error('User not found')
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password, 
                    user.password  // Compare with user.password instead of supabaseId
                )

                if (!isPasswordValid) {
                    throw new Error('Invalid password')
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    clientId: user.clientId,
                    supabaseId: user.supabaseId,
                    image: null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT, user?: ExtendedUser }): Promise<JWT> {
            if (user) {
                token.role = user.role as "ADMIN" | "MANAGER" | "USER" | "ACCOUNTANT"
                token.id = user.id
                token.clientId = user.clientId
                token.supabaseId = user.supabaseId
                token.name = user.name
            }
            return token
        },
        async session({ session, token }: { session: Session, token: JWT }): Promise<Session> {
            if (token && session.user) {
                session.user.role = token.role
                session.user.id = token.id
                session.user.clientId = token.clientId
                session.user.supabaseId = token.supabaseId
                session.user.name = token.name
            }
            return session
        }
    },
    events: {
        async signIn({ user }) {
            // do nothing
        }
    },
    debug: process.env.NODE_ENV === 'development',
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }