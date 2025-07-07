import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({

      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const formData = new FormData();
      
        formData.append('email', `${credentials?.email}`);
        formData.append('password',  `${credentials?.password}`);
        const response = await fetch('http://localhost:8000/signin', {
					method: 'POST',
					body: formData
				})
        
        const user = await response.json()
        console.log(user)
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

export {handler as GET, handler as POST}










