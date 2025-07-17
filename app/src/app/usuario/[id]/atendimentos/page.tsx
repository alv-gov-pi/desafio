import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TabelaAtendimentos from "@/components/tabelas/usuario/atendimentos/TabelaAtendimentos";
import TemplateApp from "@/components/template/autenticado/template";
import { Atendimento } from "@/types/atendimento";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Atendimentos() {
    const session = await getServerSession(authOptions)
    const servicos = [9]
    const servicos_string = servicos.toString()
    const response = await fetch(`http://localhost:8000/atendimentos/por-setor/?ids=${servicos_string}`, {
        method: "GET"
    })
    const solicitacoes: Atendimento[] = await response.json()

    if (!session) {
        redirect('/')
    }
    return (

        <TemplateApp>
            <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-10/12">
                <h1 className="text-xl font-semibold text-content-emphasis">Solicitações a sua unidade organizacional</h1>
                {solicitacoes.length > 0 ? <TabelaAtendimentos solicitacoes={solicitacoes} /> : <h1>Ainda não há solicitações</h1>}
            </div>

        </TemplateApp>
    )
}