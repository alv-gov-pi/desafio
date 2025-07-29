'use client';

import { useState } from 'react';
import { Group, Button, Box, Text } from '@mantine/core';
import { AtendimentoService } from '@/services/AtendimentoService';
import { Atendimento } from '@/types/atendimento';
import { AvaliacaoAtendimento } from '@/types/avaliacao-atendimento';

export function FormAvaliacaoAtendimento({atendimento, token} : {atendimento : Atendimento, token: string}) {
    const atendimentoService = new AtendimentoService(token);
    const [atendimentoAvaliado, setAtendimentoAvaliado] = useState(atendimento);
    const [avaliacao, setAvaliacao] = useState(0);

    const enviarAvaliacao = (value: any) => {
        setAvaliacao(value);
        const novaAvaliacao: AvaliacaoAtendimento = {
            'nota': value, 
            'genero': atendimentoAvaliado.solicitante_detalhado.genero,
            'cadastrado_em': new Date(),
            'servico_solicitado': atendimentoAvaliado.servico,
            'setor_solicitante': atendimentoAvaliado.solicitante_detalhado.setor
        }
        atendimentoService.adicionarAvaliacaoAtendimento(novaAvaliacao, atendimento.id);
    };

    const emojis = ['😠', '🙁', '😐', '🙂', '😀'];

    return (
        <Box>
            <Text size="md" mb="md" fw={500}>
                Avalie o atendimento:
            </Text>
            <Group gap="sm">
                {emojis.map((emoji, index) => {
                    const value = index + 1;
                    return (
                        <Button
                            key={value}
                            size="sm"
                            variant={avaliacao === value ? 'filled' : 'default'}
                            color={avaliacao === value ? 'yellow' : 'gray'}
                            radius="xl"
                            onClick={() => enviarAvaliacao(value)}
                            style={{ minWidth: 60 }}
                        >
                            {emoji}
                        </Button>
                    );
                })}
            </Group>
            {avaliacao > 0 && (
                <Text mt="md" c="dimmed">
                    Você avaliou o atendimento com a nota: {avaliacao}
                </Text>
            )}
        </Box>
    );
}