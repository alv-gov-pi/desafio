import TemplateApp from "@/components/template/autenticado/template";
import { AtendimentoService } from "@/services/AtendimentoService";
import { formataStringDate } from "@/utils/databr";
import { InteracaoAtendimento } from "@/types/interacao-atendimento";
import { Interacao } from "@/components/tabelas/usuario/atendimentos/Interacao";

interface DetalhaAtendimentoProps {
    params: {
        usuarioId: string;
        atendimentoId: string;
    };
}

export default async function DetalheAtendimento({ params }: DetalhaAtendimentoProps) {
    const { usuarioId, atendimentoId } = await params;
    const atendimentoService = new AtendimentoService();
    const interacaoes: InteracaoAtendimento[]  = await atendimentoService.obterInteracoesPorAtendimeto(atendimentoId);
    console.log(`atendimento ID: ${typeof atendimentoId} ${interacaoes[0]}`);
    const atendimento = await atendimentoService.obterAtendimentoPorId(atendimentoId);
    return (
        <TemplateApp>
            <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-10/12">
                <h1 className="text-xl font-semibold text-content-emphasis">Atendimento {atendimento.id}</h1>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <div ><span className="font-semibold text-content-emphasis">Solicitante:</span> {atendimento.solicitante_detalhado.nome}</div>
                        <div ><span className="font-semibold text-content-emphasis">Status:</span> {atendimento.atendido ? 'Fechado' : 'Aberto'}</div>
                    </div>
                    <div className="flex flex-col">
                        <div ><span className="font-semibold text-content-emphasis">email:</span> {atendimento.solicitante_detalhado.email}</div>
                        <div ><span className="font-semibold text-content-emphasis">Abertura:</span> {formataStringDate(atendimento.cadastrado_em)}</div>
                    </div>
                    <div className="flex flex-col">
                        <div ><span className="font-semibold text-content-emphasis">setor:</span> {atendimento.solicitante_detalhado.setor.nome}</div>
                        <div ><span className="font-semibold text-content-emphasis">Serviço:</span> {atendimento.servico_detalhado.nome}</div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-semibold text-content-emphasis">Observações</h1>
                    <p>{atendimento.observacao}</p>
                </div>
            </div>
            <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-10/12">
                <h1 className="text-xl font-semibold text-content-emphasis">Iterações</h1>
                <Interacao interacoes={interacaoes}></Interacao>
            </div>

        </TemplateApp>
    )
}