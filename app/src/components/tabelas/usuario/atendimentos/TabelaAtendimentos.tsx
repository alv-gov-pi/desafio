'use client'
import { Button, Group, Table, TableTr, TableTd, TableThead, TableTh, TableTbody } from '@mantine/core';
import { IconEye, IconHandThreeFingers } from '@tabler/icons-react';
import { Atendimento } from "@/types/atendimento";
import { formataStringDate } from '@/utils/databr';
import { useEffect, useRef, useState } from 'react';
import { useSession } from "next-auth/react"
import { AtendimentoService } from '@/services/AtendimentoService';

export default function TabelaAtendimentos({ atendimentos, idUsuarioLogado }: { atendimentos: Atendimento[], idUsuarioLogado: number, }) {
    const atendimentoService = new AtendimentoService();
    const { data: session } = useSession();
    const tabelaRef = useRef(null);
    const [linhasAtendimentos, setLinhasAtendimentos] = useState(atendimentos);

    async function atender(event) {

        event.stopPropagation();
        const linha = event.target.closest('tr');
        const idAtendimento = linha.dataset.id;
        const atendimento: Atendimento | undefined = await atendimentoService.obterAtendimentoPorId(idAtendimento);
        
        const line = linhasAtendimentos.filter(line => {
            return  line.id == linha.dataset.id; 
        });
        line[0].responsavel = idUsuarioLogado;
        console.log(line);
        // const copiaAtendimentos = [...linhasAtendimentos];
        // copiaAtendimentos.map(atendimento => {
        //     atendimento.id === idAtendimento ? atendimento.responsavel = idUsuarioLogado : null
        // })

        atendimentoService.atualizaResponsavel(idUsuarioLogado, atendimento)
        setLinhasAtendimentos(copiaAtendimentos)

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
                    <TableTh>Atendido</TableTh>
                    <TableTh>Ação</TableTh>
                </TableTr>
            </TableThead>
            <TableTbody>
                {
                    linhasAtendimentos.map((atendimento) => (

                        <TableTr key={`${atendimento.id}`} data-id={atendimento.id} ref={tabelaRef}>
                            <TableTd>{`${atendimento.id}`}</TableTd>
                            <TableTd>{formataStringDate(atendimento.cadastrado_em)}</TableTd>
                            <TableTd>{atendimento.servico_detalhado.nome}</TableTd>
                            <TableTd>{atendimento?.responsavel ? atendimento?.responsavel_detalhado.nome : 'Ainda não atribuído'}</TableTd>
                            <TableTd>{atendimento?.solicitante_detalhado?.nome}</TableTd>
                            <TableTd>{atendimento.atendido ? 'Sim' : 'Não'}</TableTd>
                            <TableTd>
                                <Group justify="center">
                                    <Button variant="default" onClick={e => atender(e)} leftSection={<IconHandThreeFingers size={16} stroke={1.5} />}>Atender</Button>
                                    <Button variant="default" leftSection={<IconEye size={16} stroke={1.5} />}>Ver</Button>
                                </Group>
                            </TableTd>
                        </TableTr>
                    ))
                }
            </TableTbody>
        </Table>
    )
}