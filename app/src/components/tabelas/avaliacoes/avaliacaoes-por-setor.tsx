'use client'
import { Table, TableTr, TableTd, TableThead, TableTh, TableTbody, TableScrollContainer } from '@mantine/core';
import React, { useState } from 'react';
import { AtendimentoService } from '@/services/AtendimentoService';
import { AvaliacaoAtendimentoPorSetor } from '@/types/avaliacao-atendimento-por-setor';

export default function TabelaAvaliacoesPorSetor({ avaliacaoesAtendimentoPorSetor }: { avaliacaoesAtendimentoPorSetor: AvaliacaoAtendimentoPorSetor[] }) {
    const atendimentoService = new AtendimentoService();

    let [listaAvaliacaoesAtendimentoPorSetor, setListaAvaliacaoesAtendimentoPorSetor] = useState(avaliacaoesAtendimentoPorSetor);

    return (
        <TableScrollContainer minWidth={400} maxHeight={300}>
            <Table withColumnBorders withTableBorder highlightOnHover striped stickyHeader={false} verticalSpacing={'sm'}>
                <TableThead>
                    <TableTr>
                        <TableTh>Setor</TableTh>
                        <TableTh>Média das Avaliações</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    {
                        listaAvaliacaoesAtendimentoPorSetor.map((avaliacao, key) => (

                            <TableTr key={`${key}`}>
                                <TableTd>{`${avaliacao.setor_nome}`}</TableTd>
                                <TableTd>{`${avaliacao.media_nota}`}</TableTd>
                            </TableTr>
                        ))
                    }
                </TableTbody>
            </Table>
        </TableScrollContainer >
    )
}