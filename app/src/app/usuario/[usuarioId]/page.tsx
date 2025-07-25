import FormEditarUsuario from "@/components/forms/usuario/editar";
import TemplateApp from "@/components/template/autenticado/template";
import { UsuarioService } from "@/services/UsuarioService";
import { Usuario } from "@/types/usuario";
import React from "react";

export default async function pageEditar({ params }: { params: Promise<{ usuarioId: number }> }) {
    const { usuarioId } = await params;
    const usuarioService = new UsuarioService();

    const usuario: Usuario = await usuarioService.obterUsuarioPorId(usuarioId)

    return (
        <TemplateApp>
            <FormEditarUsuario usuario={usuario} />
        </TemplateApp>
    )
}