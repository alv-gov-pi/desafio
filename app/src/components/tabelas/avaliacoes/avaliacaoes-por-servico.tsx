'use client'
import { Table, TableTr, TableTd, TableThead, TableTh, TableTbody, TableScrollContainer } from '@mantine/core';
import React, { useState } from 'react';
import { AvaliacaoAtendimentoPorServico } from '@/types/avaliacao-atendimento-por-servico';

export default function TabelaAvaliacoesPorServico({ avaliacaoesAtendimentoPorServico }: { avaliacaoesAtendimentoPorServico: AvaliacaoAtendimentoPorServico[] }) {

    let [listaAvaliacaoesAtendimentoPorServico, setListaAvaliacaoesAtendimentoPorSetor] = useState(avaliacaoesAtendimentoPorServico);

    return (
        <TableScrollContainer minWidth={400} maxHeight={300}>
            <Table withColumnBorders withTableBorder highlightOnHover striped stickyHeader={false} verticalSpacing={'sm'}>
                <TableThead>
                    <TableTr>
                        <TableTh>Serviço</TableTh>
                        <TableTh>Média das Avaliações</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    {
                        listaAvaliacaoesAtendimentoPorServico.map((avaliacao, key) => (

                            <TableTr key={`${key}`} >
                                <TableTd >{`${avaliacao.servico_nome}`}</TableTd>
                                <TableTd>{`${avaliacao.media_nota}`}</TableTd>
                            </TableTr>
                        ))
                    }
                </TableTbody>
            </Table>
        </TableScrollContainer>
    )
}