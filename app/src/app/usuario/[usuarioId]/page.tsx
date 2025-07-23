import FormEditarUsuario from "@/components/forms/usuario/editar";
import TemplateApp from "@/components/template/autenticado/template";
import { Usuario } from "@/types/usuario";
import React from "react";

export default async function pageEditar({ params }: { params: Promise<{ usuarioId: number }> }) {
    const { usuarioId } = await params;
    const response = await fetch(`http://localhost:8000/usuario/${usuarioId}`, {
        method: "GET"
    })
    
    const usuario: Usuario = await response.json();

    return (
        <TemplateApp>
            <FormEditarUsuario usuario={usuario} />
        </TemplateApp>
    )
}