import TemplateApp from "@/components/template/autenticado/template";
import { Atendimento } from "@/types/atendimento";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import React from "react";
import TabelaSolicitacoes from "@/components/tabelas/usuario/solicitacoes/TabelaSolicitacoes";
import { AtendimentoService } from "@/services/AtendimentoService";

export default async function solicitacoes() {
    const session = await getServerSession(authOptions)
    if (!session) {
        redirect('/')
    }
    const usuarioId = session?.user.id;
    const atendimentoService = new AtendimentoService();
    const solicitacoes = await atendimentoService.obterSolicitacoesPorSolicitanteId(usuarioId);
    
    return (
        <TemplateApp >
            <TabelaSolicitacoes solicitacoes={solicitacoes} />
        </TemplateApp>
    )
}