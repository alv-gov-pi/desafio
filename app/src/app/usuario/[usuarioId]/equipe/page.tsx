import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TabelaUsuario from "@/components/tabelas/usuario";
import TemplateApp from "@/components/template/autenticado/template";
import { UsuarioService } from "@/services/UsuarioService";
import { Usuario } from "@/types/usuario";
import { getServerSession } from "next-auth";
import FiltroUsuario from "@/components/forms/usuario/filtro";
import CardPadrao from "@/components/card";

export default async function listarUsuario() {
    const session = await getServerSession(authOptions)
    const token: string = session?.user.access;
    const setor: number = session?.user.setor;
    const usuarioService: UsuarioService = new UsuarioService(token);
    const usuarios: Usuario[] = await usuarioService.obterUsuariosPorSetor(setor);

    return (
        <TemplateApp>
            <FiltroUsuario />
            <CardPadrao titulo="Membros da Equipe">
                <TabelaUsuario usuarios={usuarios} token={token} />
            </CardPadrao>
        </TemplateApp>

    )
}