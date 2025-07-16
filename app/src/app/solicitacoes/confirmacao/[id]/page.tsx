import { NumberInput, TextInput, Button } from '@mantine/core';
import TemplateApp from "@/components/template/autenticado/template";
import { Servico } from "@/types/servico";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Usuario } from "@/types/usuario";

import FormSolicitacaoServico from '@/components/forms/servico/solicitacao';
export default async function confirmacao({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions)

    const emailUsuario = session?.user?.email;
    const response = await fetch(`http://localhost:8000/servico/${id}`, {
        method: "GET"
    })
    const servico: Servico = await response.json();

    const responseSolicitante = await fetch(`http://localhost:8000/usuario/por-email/${emailUsuario}/`, {
        method: "GET"
    })
    const solicitante: Usuario = await responseSolicitante.json();
   
    const props = {servico, solicitante}
   
    return (
        <TemplateApp>
            <FormSolicitacaoServico props={props}></FormSolicitacaoServico>
        </TemplateApp>
    );
}