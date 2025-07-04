import FormEditarUsuario from "@/components/forms/usuario/editar";
import { Usuario } from "@/models/Auth";
import React from "react";

export default async function pageEditar({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const response = await fetch(`http://localhost:8000/usuario/${id}`, {
        method: "GET"
    })
    
    const usuario: Usuario = await response.json();

    return (
        <main>
            <FormEditarUsuario usuario={usuario} />
        </main>
    )
}