import TemplateApp from "@/components/template/autenticado/template";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import React from "react";
import TabelaSolicitacoes from "@/components/tabelas/usuario/solicitacoes/TabelaSolicitacoes";
import { AtendimentoService } from "@/services/AtendimentoService";

export default async function solicitacoes() {
    const session = await getServerSession(authOptions)
    const token: string = session?.user.access;
    const usuarioId = session?.user.id;
    const atendimentoService = new AtendimentoService(token);
    const solicitacoes = await atendimentoService.obterSolicitacoesPorSolicitanteId(usuarioId);
    
    return (
        <TemplateApp >
            <TabelaSolicitacoes solicitacoes={solicitacoes} token={token} />
        </TemplateApp>
    )
}