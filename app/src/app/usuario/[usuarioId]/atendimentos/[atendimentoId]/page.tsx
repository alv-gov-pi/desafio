import TemplateApp from "@/components/template/autenticado/template";
import { AtendimentoService } from "@/services/AtendimentoService";
import { InteracaoAtendimento } from "@/types/interacao-atendimento";
import { Interacao } from "@/components/tabelas/usuario/atendimentos/Interacao";
import FormFinalizaAtendimento from '@/components/forms/atendimento/form-finaliza-atendimento';

interface DetalhaAtendimentoProps {
    params: {
        usuarioId: string;
        atendimentoId: string;
    };
}

export default async function DetalheAtendimento({ params }: DetalhaAtendimentoProps) {
    const { usuarioId, atendimentoId } = await params;
    const atendimentoService = new AtendimentoService();
    const interacaoes: InteracaoAtendimento[] = await atendimentoService.obterInteracoesPorAtendimeto(atendimentoId);
    const atendimento = await atendimentoService.obterAtendimentoPorId(atendimentoId);

    return (
        <TemplateApp>
            <FormFinalizaAtendimento atendimento={atendimento} />
            <Interacao interacoes={interacaoes} idAtendimento={atendimentoId} tipoUsuario="A"></Interacao>
        </TemplateApp>
    )
}