import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";

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
        formData.append('password',  `${credentials?.password}`);
        const response = await fetch('http://localhost:8000/signin', {
					method: 'POST',
					body: formData
				})
        
        const userJson = await response.json()
        const user = { id: '1', name: userJson.usuario.nome, email: userJson.usuario.email,genero: userJson.usuario.genero} 
				if (user && response.ok) {
          return user
				}

				return null
      }
    })
  ], 
  pages: {
    signIn: "/"
  }
}
const handler =  NextAuth(authOptions)

export {handler as GET, handler as POST, authOptions}










