import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions, User } from "next-auth";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials, req) {
        const formData = new FormData();
        formData.append('email', `${credentials?.email}`);
        formData.append('password', `${credentials?.password}`);
        const response = await fetch('http://localhost:8000/signin', {
          method: 'POST',
          body: formData
        })

        const respJson = await response.json()
        const user: User = {
          id: respJson.usuario.id,
          name: respJson.usuario.nome,
          nome: respJson.usuario.nome,
          email: respJson.usuario.email,
          genero: respJson.usuario.genero,
          setor: respJson.usuario.setor,
          access: respJson.access,
          refresh: respJson.refresh,
        }
        if (user && response.ok) {
          return user
        }

        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/"
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.nome = user.nome
        token.email = user.email
        token.access = user.access
        token.refresh = user.refresh
        token.setor = user.setor
      }
      return token
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.nome = token.nome
        session.user.email = token.email
        session.user.access = token.access
        session.user.refresh = token.refresh
        session.user.setor = token.setor
      }
      return session
    }
  }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }










