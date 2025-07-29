'use client'
import { Button, Group, Table, TableTr, TableTd, TableThead, TableTh, TableTbody } from '@mantine/core';
import { IconEye, IconHandThreeFingers } from '@tabler/icons-react';
import { Atendimento } from "@/types/atendimento";
import { formataStringDate } from '@/utils/databr';
import React, { BaseSyntheticEvent, useState } from 'react';
import { useSession } from "next-auth/react"
import { AtendimentoService } from '@/services/AtendimentoService';
import { redirect } from 'next/navigation';

export default function TabelaAtendimentos({ atendimentos, idUsuarioLogado, token }: { atendimentos: Atendimento[], idUsuarioLogado: number, token: string }) {
    const atendimentoService = new AtendimentoService(token);
    const { data: session } = useSession();

    let [linhasAtendimentos, setLinhasAtendimentos] = useState(atendimentos);

    async function atender(event: BaseSyntheticEvent) {
        event.stopPropagation();
        const linha = event.target.closest('tr');
        const idAtendimento = linha.dataset.id;
        const atendimento: Atendimento = await atendimentoService.obterAtendimentoPorId(idAtendimento);
        const atendimentoAtualizado: Atendimento = await atendimentoService.atualizaResponsavel(idUsuarioLogado, atendimento)
        const copiaAtendimentos = linhasAtendimentos.map(linha => linha.id == atendimentoAtualizado.id ? linha = atendimentoAtualizado : linha)
        setLinhasAtendimentos(copiaAtendimentos);
    }

    function ver(event: BaseSyntheticEvent) {
        event.stopPropagation();
        const linha = event.target.closest('tr');
        const idAtendimento = linha.dataset.id;
        redirect(`/usuario/${idUsuarioLogado}/atendimentos/${idAtendimento}`)
    }

    return (
        <Table withColumnBorders withTableBorder highlightOnHover striped>
            <TableThead>
                <TableTr>
                    <TableTh>ID</TableTh>
                    <TableTh>Cadastrado Em</TableTh>
                    <TableTh>Serviço</TableTh>
                    <TableTh>Resposavel</TableTh>
                    <TableTh>Solicitante</TableTh>
                    <TableTh>Atendido em</TableTh>
                    <TableTh>Ação</TableTh>
                </TableTr>
            </TableThead>
            <TableTbody>
                {
                    linhasAtendimentos.map((atendimento) => (

                        <TableTr key={`${atendimento.id}`} data-id={atendimento.id}>
                            <TableTd>{`${atendimento.id}`}</TableTd>
                            <TableTd>{formataStringDate(atendimento.cadastrado_em)}</TableTd>
                            <TableTd>{atendimento.servico_detalhado.nome}</TableTd>
                            <TableTd>{atendimento?.responsavel ? atendimento?.responsavel_detalhado.nome : 'Ainda não atribuído'}</TableTd>
                            <TableTd>{atendimento?.solicitante_detalhado?.nome}</TableTd>
                            <TableTd>{atendimento.resolvido_em ? formataStringDate(atendimento.resolvido_em) : 'Não resolvido'}</TableTd>
                            <TableTd>
                                <Group justify="center">
                                    <Button disabled={atendimento.responsavel !== null ? true : false} variant="default" onClick={e => atender(e)} leftSection={<IconHandThreeFingers size={16} stroke={1.5} />}>Atender</Button>
                                    <Button variant="default" onClick={e => ver(e)} leftSection={<IconEye size={16} stroke={1.5} />}>Ver</Button>
                                </Group>
                            </TableTd>
                        </TableTr>
                    ))
                }
            </TableTbody>
        </Table>
    )
}