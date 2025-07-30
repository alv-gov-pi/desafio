import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FormEditarUsuario from "@/components/forms/usuario/editar";
import TemplateApp from "@/components/template/autenticado/template";
import { SetorService } from "@/services/SetorService";
import { UsuarioService } from "@/services/UsuarioService";
import { Setor } from "@/types/setor";
import { Usuario } from "@/types/usuario";
import { getServerSession } from "next-auth";
import React from "react";

export default async function pageEditar({ params }: { params: Promise<{ usuarioId: number }> }) {
    const { usuarioId } = await params;
    const session = await getServerSession(authOptions)
    const token: string  = session?.user.access;
    const usuarioService = new UsuarioService(token);
    const setorService: SetorService = new SetorService(token);
    const setores: Setor[] = await setorService.obterTodosSetores();
    const usuario: Usuario = await usuarioService.obterUsuarioPorId(usuarioId)


    return (
        <TemplateApp>
            <FormEditarUsuario usuario={usuario} token={token} setores={setores}/>
        </TemplateApp>
    )
}