import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TabelaUsuario from "@/components/tabelas/usuario";
import TemplateApp from "@/components/template/autenticado/template";
import { UsuarioService } from "@/services/UsuarioService";
import { Usuario } from "@/types/usuario";
import { getServerSession } from "next-auth";

export default async function listarUsuario() {
    const session = await getServerSession(authOptions)
    const token: string = session?.user.access;
    const usuarioService: UsuarioService = new UsuarioService(token);
    const usuarios: Usuario[] = await usuarioService.obterUsuarios();

    return(
        <TemplateApp>
            <h1>Todos os Usuários</h1>
            <TabelaUsuario usuarios={usuarios}/>
        </TemplateApp>
       
    )
}