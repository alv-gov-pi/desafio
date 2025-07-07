import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface Session {
        usuario: {
            id: string,
            email: string,
            name: string
        }
    }
}