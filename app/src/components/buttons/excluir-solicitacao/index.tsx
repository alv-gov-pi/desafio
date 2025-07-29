'use client'
import { IconTrash } from '@tabler/icons-react';
import { Button, Tooltip, Notification } from '@mantine/core';
import { AtendimentoService } from '@/services/AtendimentoService';
import { SyntheticEvent } from 'react';
import { notifications } from '@mantine/notifications';
import { useModals } from '@mantine/modals';
export default function BotaoExcluirSolicitacao({ id, token }: { id: number, token: string }) {
    const atendimentoService: AtendimentoService = new AtendimentoService(token);
    const modals = useModals();
    function notificar() {
        notifications.show({
            color: 'red',
            title: 'Você deletou a solicitação',
            message: 'Você deletou a solicitação, recarregue a página !!!',
            autoClose: 5000,
        });
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