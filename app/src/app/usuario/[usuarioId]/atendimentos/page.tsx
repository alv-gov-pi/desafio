import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TabelaAtendimentos from "@/components/tabelas/usuario/atendimentos/TabelaAtendimentos";
import TemplateApp from "@/components/template/autenticado/template";
import { Atendimento } from "@/types/atendimento";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AtendimentoService } from '@/services/AtendimentoService';
import { SetorService } from "@/services/SetorService";
import { Servico } from "@/types/servico";

export default async function Atendimentos() {
    const session = await getServerSession(authOptions)
    const token: string = session?.user.access;
    if(!session?.user.id) {
        throw Error("Erro ao recuperar sessão !!!")
    }
    const idUsuarioLogado: number = Number(session?.user.id);
    const setorService: SetorService = new SetorService(token);
    const servicos: Servico[] = await setorService.obterServicosPorSetorId(session.user.setor);
    const servicosString = servicos.map(servico => servico.id).toString();
    const atendimentoService = new AtendimentoService(token);
   
    const response =  await atendimentoService.obterAtentimentoPorServicos(servicosString);
    
    const atendimentos : Atendimento[] | null = response
    
    if (!session) {
        redirect('/')
    }
    return (

        <TemplateApp>
            <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-10/12">
                <h1 className="text-xl font-semibold text-content-emphasis">Solicitações a sua unidade organizacional</h1>
                {atendimentos ? <TabelaAtendimentos atendimentos={atendimentos} idUsuarioLogado={idUsuarioLogado} token={token}/> : <h1>Ainda não há solicitações</h1>}
            </div>
        
        </TemplateApp>
    )
}