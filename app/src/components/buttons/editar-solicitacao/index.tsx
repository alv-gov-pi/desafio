'use client'
import { IconEdit } from '@tabler/icons-react';
import { Button, Tooltip  } from '@mantine/core';

export default function BotaoEditarSolicitacao({solicitanteId, solicitacaoId}: {solicitanteId: number, solicitacaoId: number}){
    return (
        <Tooltip label="Editar solicitação">
            <Button component="a" href={`http://localhost:3000/usuario/${solicitanteId}/solicitacoes/${solicitacaoId}/`}  variant="filled" leftSection={<IconEdit size={16} stroke={1.5} />} >Editar</Button>
        </Tooltip>
    )
}