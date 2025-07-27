import NextAuth from 'next-auth'

declare module 'next-auth' {
     interface Session {
        user: {
            id: string | undefined,
            nome: string | undefined | null,
            email: string | undefined | null,
            genero: string | undefined,
            refresh: string | undefined,
            access: string | undefined,
            setor: number | undefined,
        }
    }
    interface User {
        nome: string | undefined | null,
        id: string,
        genero: string,
        refresh: string,
        access: string,
        setor: number,
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string | undefined,
        nome: string | undefined | null,
        email: string | undefined | null,
        genero: string | undefined,
        refresh: string | undefined,
        access: string | undefined,
        setor: number | undefined,
    }
}