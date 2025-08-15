import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PainelFiltroUsuario } from "@/components/painel-filtro-usuario";
import TemplateApp from "@/components/template/autenticado/template";
import { UsuarioService } from "@/services/UsuarioService";
import { Usuario } from "@/types/usuario";
import { getServerSession } from "next-auth";
import { SearchParams } from "nuqs";


export default async function teste({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
    const session = await getServerSession(authOptions)
    const token: string = session?.user.access;
    const setor: number = session?.user.setor;
    const usuarioService: UsuarioService = new UsuarioService(token);
    const usuarios: Usuario[] = await usuarioService.obterUsuariosPorSetor(setor);
    return (
        <TemplateApp>
            <PainelFiltroUsuario usuarios={usuarios} token={token} setor={setor}></PainelFiltroUsuario>
        </TemplateApp>
    )
}

