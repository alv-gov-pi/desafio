import BigNumber from "@/components/charts/atendimento/big-number";
import LineChartAberturaFechamento from "@/components/charts/atendimento/line-chart-abertura-fechamento";
import TabelaAvaliacoesPorServico from "@/components/tabelas/avaliacoes/avaliacaoes-por-servico";
import TabelaAvaliacoesPorSetor from "@/components/tabelas/avaliacoes/avaliacaoes-por-setor";
import TabelaQuantidadeAtendimentoPorResponsavel from "@/components/tabelas/usuario/atendimentos/tabela-quantidade-atendimentos-responsavel";
import TemplateApp from "@/components/template/autenticado/template"
import { AtendimentoService } from "@/services/AtendimentoService";
import { AtendimentoPorData } from "@/types/atendimento-por-data";
import { AtendimentoTotais } from "@/types/atendimentos-totais";
import { AvaliacaoAtendimentoPorServico } from "@/types/avaliacao-atendimento-por-servico";
import { AvaliacaoAtendimentoPorSetor } from "@/types/avaliacao-atendimento-por-setor";
import { QuantidadeAtendimentoPorResponsavel } from "@/types/quantidade-atendimento-por-responsavel";
import { formataParaTresDigitos } from "@/utils/formataNumero"; 
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function paineis({ params }: { params: Promise<{ id: number }> }) {
    const { id } = await params;
    const session = await getServerSession(authOptions)
    const token: string  = session?.user.access;
    const atendimentoService = new AtendimentoService(token);
    const atendimentoPorResponsavel: QuantidadeAtendimentoPorResponsavel[] = await atendimentoService.obterQuantidadedeAtendimentosPorResponsavel();
    console.log(atendimentoPorResponsavel);
    const media_nota_por_setor: AvaliacaoAtendimentoPorSetor[] = await atendimentoService.obterEstatisticasAvaliacaoPorSetorSolicitante()
    const media_nota_por_servico: AvaliacaoAtendimentoPorServico[] = await atendimentoService.obterEstatisticasAvaliacaoPorServicoSolicitado()

    const agrupamento_uniao_datas: AtendimentoPorData[] = await atendimentoService.obterEstatisticasAtentimentoPorData();
    const atendimentoTotais: AtendimentoTotais = await atendimentoService.obterEstatisticasTotais();
    const totais: string = formataParaTresDigitos(atendimentoTotais.nao_atendidos + atendimentoTotais.atendidos);
    const abertos: string = formataParaTresDigitos(atendimentoTotais.nao_atendidos);
    const  fechados: string = formataParaTresDigitos(atendimentoTotais.atendidos);
    return (
        <TemplateApp >
            <div className="flex w-8/12 justify-between gap-2 space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200">
                <div className="flex flex-col h-12/12   w-8/12 justify-between  space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 ">
                    <h1 className="text-xl font-semibold text-content-emphasis">Estátisticas dos chamados</h1>
                    <div className="flex justify-between">
                        <BigNumber titulo="Total" numero={totais} cor="text-sky-600" ></BigNumber>
                        <BigNumber titulo="Abertos" numero={abertos} cor="text-red-600" ></BigNumber>
                        <BigNumber titulo="Fechados" numero={fechados} cor="text-teal-600" ></BigNumber>
                    </div>
                    <div className="flex flex-col ">
                        <LineChartAberturaFechamento atendimentosPorData={agrupamento_uniao_datas}/>
                    </div>
                </div>

                <div className="h-12/12 space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200  w-6/12">
                    <h1 className="text-xl font-semibold text-content-emphasis">Média das Avaliações por Setor Solicitante</h1>
                    <TabelaAvaliacoesPorSetor avaliacaoesAtendimentoPorSetor={media_nota_por_setor} />
                    <h1 className="text-xl font-semibold text-content-emphasis">Média das Avaliações por Serviço Solicitado</h1>
                    <TabelaAvaliacoesPorServico avaliacaoesAtendimentoPorServico={media_nota_por_servico} />
                    <h1 className="text-xl font-semibold text-content-emphasis">Quantidade de atendimentos por Responsável</h1>
                    <TabelaQuantidadeAtendimentoPorResponsavel quantidadeAtendimentoPorResponsavel={atendimentoPorResponsavel}/>
                </div>

            </div>
        </TemplateApp>
    );
}