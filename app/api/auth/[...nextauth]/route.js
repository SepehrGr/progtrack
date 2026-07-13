import { baseURL } from '@/app/lib/api'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user
      return session
    }
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'نام کاربری', type: 'text' },
        password: { label: 'رمز عبور', type: 'password' }
      },

      async authorize(credentials, req) {
        const res = await fetch(`${baseURL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `username=${credentials.username}&password=${credentials.password}`
        })

        const user = await res.json()
        if (res.ok && user) {
          return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
