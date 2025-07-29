import TemplateApp from "@/components/template/autenticado/template";
import { AtendimentoService } from "@/services/AtendimentoService";
import { InteracaoAtendimento } from "@/types/interacao-atendimento";
import { Interacao } from "@/components/tabelas/usuario/atendimentos/Interacao";
import FormFinalizaAtendimento from '@/components/forms/atendimento/form-finaliza-atendimento';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface DetalhaAtendimentoProps {
    params: {
        usuarioId: string;
        atendimentoId: string;
    };
}

export default async function DetalheAtendimento({ params }: DetalhaAtendimentoProps) {
    const { usuarioId, atendimentoId } = await params;
    const session = await getServerSession(authOptions)
    const token : string = session?.user.access;
    const atendimentoService = new AtendimentoService(token);
    const interacaoes: InteracaoAtendimento[] = await atendimentoService.obterInteracoesPorAtendimeto(atendimentoId);
    const atendimento = await atendimentoService.obterAtendimentoPorId(atendimentoId);

    return (
        <TemplateApp>
            <FormFinalizaAtendimento atendimento={atendimento} token={token} />
            <Interacao interacoes={interacaoes} idAtendimento={atendimentoId} tipoUsuario="A" token={token}></Interacao>
        </TemplateApp>
    )
}