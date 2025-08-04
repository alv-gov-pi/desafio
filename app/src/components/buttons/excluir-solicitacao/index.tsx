'use client'
import { IconTrash } from '@tabler/icons-react';
import { Button, Tooltip } from '@mantine/core';
import { AtendimentoService } from '@/services/AtendimentoService';
import { SyntheticEvent } from 'react';
import { useModals } from '@mantine/modals';
import mostrarNotificacao from '@/utils/notification';

import { useRouter } from 'next/navigation';

export default function BotaoExcluirSolicitacao({ id, token, solicitanteId }: { id: number, token: string, solicitanteId: number }) {
    const atendimentoService: AtendimentoService = new AtendimentoService(token);
    const modals = useModals();
    const router = useRouter();
    function notificar() {
        mostrarNotificacao('Você deletou a solicitação', 'Você deletou a solicitação!!!', 'red')
        router.refresh();  
    }

    function excluirDefinitivamente() {
        console.log(id);
        notificar();
        atendimentoService.exluirAtendimento(id);
    }
    
    function confirmarExclusao(event: SyntheticEvent) {
        event.preventDefault();

        modals.openConfirmModal({
            title: 'Confirmar exclusão',
            children: 'Tem certeza que deseja excluir esta solicitação?',
            labels: { confirm: 'Sim, excluir', cancel: 'Cancelar' },
            confirmProps: { color: 'red' },
            onConfirm: () => excluirDefinitivamente(),
        });
    }

    return (
        <Tooltip label="Excluir solicitação">
            <Button component="a" onClick={e => confirmarExclusao(e)} variant="filled" color="red" leftSection={<IconTrash size={16} stroke={1.5} />} >Excluir</Button>
        </Tooltip>
    )
}