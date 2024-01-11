import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "src/auth/actions/auth-actions";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const user = await signInEmailPassword(credentials!.email, credentials!.password)
                    .then(response => {
                        return response?.data.data
                    })
                    .catch(error => {
                        console.error(error);
                    });
                if (user) return user
                return null
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_SECRET ?? "",
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
}

const handle = NextAuth(authOptions);
export { handle as GET, handle as POST }

