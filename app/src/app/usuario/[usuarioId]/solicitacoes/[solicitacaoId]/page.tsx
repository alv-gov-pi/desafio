import TemplateApp from "@/components/template/autenticado/template";
import { AtendimentoService } from "@/services/AtendimentoService";
import { InteracaoAtendimento } from "@/types/interacao-atendimento";
import { Interacao } from "@/components/tabelas/usuario/atendimentos/Interacao";
import CardDetalhaAtendimento from "@/components/card/solicitacao";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface DetalhaSolicitacaoProps {
    params: {
        usuarioId: string;
        solicitacaoId: string;
    };
}

export default async function DetalheAtendimento({ params }: DetalhaSolicitacaoProps) {
    const { usuarioId, solicitacaoId } = await params;
    const session = await getServerSession(authOptions)
    const token: string = session?.user.access;
    const atendimentoService = new AtendimentoService(token);
    const interacaoes: InteracaoAtendimento[] = await atendimentoService.obterInteracoesPorAtendimeto(solicitacaoId);
    const atendimento = await atendimentoService.obterAtendimentoPorId(solicitacaoId);

    return (
        <TemplateApp>
            <CardDetalhaAtendimento atendimento={atendimento} token={token}/>
            <Interacao interacoes={interacaoes} idAtendimento={solicitacaoId} tipoUsuario="S" token={token}></Interacao>
        </TemplateApp>
    )
}