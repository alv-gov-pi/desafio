import TemplateApp from "@/components/template/autenticado/template";
import { AtendimentoService } from "@/services/AtendimentoService";
import { InteracaoAtendimento } from "@/types/interacao-atendimento";
import { Interacao } from "@/components/tabelas/usuario/atendimentos/Interacao";
import CardDetalhaAtendimento from "@/components/card/solicitacao";

interface DetalhaSolicitacaoProps {
    params: {
        usuarioId: string;
        solicitacaoId: string;
    };
}

export default async function DetalheAtendimento({ params }: DetalhaSolicitacaoProps) {
    const { usuarioId, solicitacaoId } = await params;
    const atendimentoService = new AtendimentoService();
    const interacaoes: InteracaoAtendimento[] = await atendimentoService.obterInteracoesPorAtendimeto(solicitacaoId);
    const atendimento = await atendimentoService.obterAtendimentoPorId(solicitacaoId);

    return (
        <TemplateApp>
            <CardDetalhaAtendimento atendimento={atendimento} />
            <Interacao interacoes={interacaoes} idAtendimento={solicitacaoId} tipoUsuario="S"></Interacao>
        </TemplateApp>
    )
}