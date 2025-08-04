import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TabelaUsuario from "@/components/tabelas/usuario";
import TemplateApp from "@/components/template/autenticado/template";
import { UsuarioService } from "@/services/UsuarioService";
import { Usuario } from "@/types/usuario";
import { getServerSession } from "next-auth";

export default async function listarUsuario() {
    const session = await getServerSession(authOptions)
    const token: string = session?.user.access;
    const setor: number = session?.user.setor;
    const usuarioService: UsuarioService = new UsuarioService(token);
    const usuarios: Usuario[] = await usuarioService.obterUsuariosPorSetor(setor);

    return (
        <TemplateApp>
            <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-10/12 flex flex-col">
                <h1 className="text-xl font-semibold text-content-emphasis">Membros da equipe </h1>
                <TabelaUsuario usuarios={usuarios} />
            </div>
        </TemplateApp>

    )
}