'use client'
import { IconTrash } from '@tabler/icons-react';
import { Button, Tooltip  } from '@mantine/core';

export default function BotaoExcluirSolicitacao({id}: {id: number}){
    return (
        <Tooltip label="Excluir solicitação">
            <Button component="a" href={`http://localhost:3000/solicitacoes/${id}/excluir/`}  variant="filled" color="red" leftSection={<IconTrash size={16} stroke={1.5} />} >Excluir</Button>
        </Tooltip>
    )
}