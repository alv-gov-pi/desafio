import { NumberInput, TextInput, Button } from '@mantine/core';
import TemplateApp from "@/components/template/autenticado/template";
import { Servico } from "@/types/servico";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Usuario } from "@/types/usuario";

import FormSolicitacaoServico from '@/components/forms/servico/solicitacao';
import { UsuarioService } from '@/services/UsuarioService';
import { ServicoService } from '@/services/ServicoService';
export default async function confirmacao({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions)
    const token: string  = session?.user.access;
    const usuarioService: UsuarioService = new UsuarioService(token);
    const servicoService: ServicoService = new ServicoService(token);


    const servico: Servico = await servicoService.obterServicoPorId(id);


    const solicitante: Usuario = await usuarioService.obterUsuarioPorId(session?.user.id)
   
    const props = {servico, solicitante, token}
   
    return (
        <TemplateApp>
            <FormSolicitacaoServico props={props}></FormSolicitacaoServico>
        </TemplateApp>
    );
}