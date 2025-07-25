'use client'
import { Table, TableTr, TableTd, TableThead, TableTh, TableTbody, TableScrollContainer } from '@mantine/core';
import React, { useState } from 'react';
import { AtendimentoService } from '@/services/AtendimentoService';
import { QuantidadeAtendimentoPorResponsavel } from '@/types/quantidade-atendimento-por-responsavel';

export default function TabelaQuantidadeAtendimentoPorResponsavel({ quantidadeAtendimentoPorResponsavel }: { quantidadeAtendimentoPorResponsavel: QuantidadeAtendimentoPorResponsavel[] }) {
    const atendimentoService = new AtendimentoService();

    let [listaQuantidadeAtendimentoPorResponsavel, setListaQuantidadeAtendimentoPorResponsavel] = useState(quantidadeAtendimentoPorResponsavel);

    return (
        <TableScrollContainer minWidth={400} maxHeight={300}>
            <Table withColumnBorders withTableBorder highlightOnHover striped stickyHeader={false} verticalSpacing={'sm'}>
                <TableThead>
                    <TableTr>
                        <TableTh>Responsável</TableTh>
                        <TableTh>Quantidade de Atendimentos</TableTh>
                    </TableTr>
                </TableThead>
                <TableTbody>
                    {
                        listaQuantidadeAtendimentoPorResponsavel.map((avaliacao, key) => (

                            <TableTr key={`${key}`}>
                                <TableTd>{`${avaliacao.nome_responsavel}`}</TableTd>
                                <TableTd>{`${avaliacao.quantidade_atendimentos}`}</TableTd>
                            </TableTr>
                        ))
                    }
                </TableTbody>
            </Table>
        </TableScrollContainer >
    )
}