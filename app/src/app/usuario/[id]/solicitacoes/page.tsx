import TemplateApp from "@/components/template/autenticado/template";
import { Atendimento } from "@/types/atendimento";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import React from "react";
import TabelaSolicitacoes from "@/components/tabelas/usuario/solicitacoes/TabelaSolicitacoes";

export default async function solicitacoes() {
    const session = await getServerSession(authOptions)
    const response = await fetch(`http://localhost:8000/solicitacoes/por-solicitante/7`, {
        method: "GET"
    })
    const solicitacoes: Atendimento[] = await response.json()

    if (!session) {
        redirect('/')
    }
    return (
        <TemplateApp >
            <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-10/12">
                <h1 className="text-xl font-semibold text-content-emphasis">Suas solicitações</h1>
                <TabelaSolicitacoes solicitacoes={solicitacoes}/>
            </div>
        </TemplateApp>
    )
}