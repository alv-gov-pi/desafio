import { Group } from "@mantine/core";
import BotaoEditarSolicitacao from "../editar-solicitacao";
import BotaoExcluirSolicitacao from "../excluir-solicitacao";
import { Atendimento } from "@/types/atendimento";

export default function AcoesAtendimento({atendimento, token}:{atendimento: Atendimento, token: string}) {
    return (
        <Group justify="center">
            <BotaoExcluirSolicitacao id={atendimento.id} token={token}/>
            <BotaoEditarSolicitacao solicitacaoId={atendimento.id} solicitanteId={atendimento.solicitante_detalhado.id} />
        </Group>
    )
}