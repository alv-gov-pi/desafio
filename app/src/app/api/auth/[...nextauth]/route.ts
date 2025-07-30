import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import { AuthService } from "@/services/AuthService";

async function refreshAccessToken(token: any) {
  try {
    console.log("Tentando refrescar o token...");
    const authService = new AuthService();
    const response = await authService.refreshToken(token.refresh);

    const refreshedTokens = await response.json();

    if (response.ok) {
      console.log("Token refrescado com sucesso!");
      // O simplejwt retorna `access` e `refresh` (opcionalmente) e a duração do access token.
      // O `expires_in` geralmente vem em segundos.
      const newAccessTokenExpires = Date.now() + 5 * 60 * 1000;

      return {
        ...token,
        access: refreshedTokens.access,
        accessTokenExpires: newAccessTokenExpires,
      };
    } else {
      console.error("Erro ao refrescar o token:", refreshedTokens);
      // Se o refresh token também falhar (expirado, inválido), o usuário precisará fazer login novamente.
      return { ...token, error: "RefreshAccessTokenError" };
    }
  } catch (error) {
    console.error("Exceção durante o refresh do token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials, req) {
        const authService: AuthService = new AuthService();
        const response = await authService.login(credentials?.email, credentials?.password);

        const respJson = await response.json()
        console.log("RESPJSON: ", JSON.stringify(respJson))
        const user: User = {
          id: respJson.usuario.id,
          name: respJson.usuario.nome,
          nome: respJson.usuario.nome,
          email: respJson.usuario.email,
          genero: respJson.usuario.genero,
          setor: respJson.usuario.setor,
          access: respJson.access,
          accessTokenExpires: respJson.accessTokenExpires,
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
        token.accessTokenExpires = user.accessTokenExpires
        token.setor = user.setor
        return token
      }
      if (token.accessTokenExpires !== undefined && Date.now() < token.accessTokenExpires - (5 * 60 * 1000)) { 
        return token
      }
      // Se o token de acesso expirou (ou está prestes a expirar), tente refrescá-lo
      return refreshAccessToken(token)
    },
    session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.nome = token.nome
        session.user.email = token.email
        session.user.access = token.access
        session.user.refresh = token.refresh
        session.user.accessTokenExpires = token.accessTokenExpires
        session.user.setor = token.setor
      }
      return session
    }
  }
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST, authOptions }










