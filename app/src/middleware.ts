import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    // Este é o seu middleware principal, que só será executado se 'authorized' retornar true
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const token = req.nextauth.token; // O token de sessão, se o usuário estiver autenticado

        console.log('Passou no middleware. Path:', pathname, 'Token existe:', !!token);

        // Se o usuário estiver autenticado E tentando acessar a raiz ou a página de cadastro
        if (token && (pathname === "/" || pathname === "/usuario/cadastro")) {
            console.log('Usuário autenticado, redirecionando para /usuario');
            return NextResponse.redirect(new URL("/usuario", req.url));
        }

        // Para todos os outros casos (usuário não autenticado em / ou /usuario/cadastro,
        // ou usuário autenticado em outras páginas), permite a requisição prosseguir.
        // A lógica de restrição para não autenticados em outras páginas é tratada em 'authorized'.
        console.log('Permitindo a requisição prosseguir.');
        return NextResponse.next();
    },
    {
        callbacks: {
            // Esta função determina se a requisição pode prosseguir para o middleware ou para a página
            authorized({ token, req }) {
                const { pathname } = req.nextUrl;

                console.log('Passou no authorized. Path:', pathname, 'Token existe:', !!token);

                // 1. Se o usuário NÃO estiver autenticado (!token)
                if (!token) {
                    // Permitir acesso apenas a '/' e '/usuario/cadastro'
                    if (pathname === "/" || pathname === "/usuario/cadastro") {
                        console.log('Não autenticado, permitindo acesso a / ou /usuario/cadastro');
                        return true; // Autorizado
                    }
                    // Para qualquer outra página, se não estiver autenticado, NÃO autorizar
                    // (NextAuth irá redirecionar para a página de login configurada, ou para a raiz se não houver)
                    console.log('Não autenticado, bloqueando acesso a outras páginas');
                    return false; // Não autorizado
                }

                // 2. Se o usuário ESTIVER autenticado (token existe)
                // Sempre autorizar aqui, pois o middleware principal lidará com os redirecionamentos específicos
                console.log('Autenticado, sempre autorizado para que o middleware possa agir');
                return true; // Autorizado
            },
        },
    }
);

export const config = {
    // O matcher define quais rotas o middleware deve ser aplicado.
    // Isso inclui a raiz, qualquer coisa dentro de /usuario/, e qualquer outra rota que você queira proteger.
    // A expressão regular exclui arquivos estáticos e APIs para não interferir.
    matcher: [
        '/', 
        '/usuario/:path*', 
        '/((?!api|_next/static|_next/image|favicon.ico|image).*)',
    ],
};