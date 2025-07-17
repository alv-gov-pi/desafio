import { Button, Group, Table, TableTr, TableTd, TableThead, TableTh, TableTbody } from '@mantine/core';
import { IconEye, IconMessageCircle2 } from '@tabler/icons-react';
import { Atendimento } from "@/types/atendimento";
import { formataStringDate } from '@/utils/databr';

export default function TabelaAtendimentos({ solicitacoes }: { solicitacoes: Atendimento[] }) {
    const linhas = solicitacoes.map((atendimento) => (
        <TableTr key={`${atendimento.id}`}>
            <TableTd>{`${atendimento.id}`}</TableTd>
            <TableTd>{formataStringDate(atendimento.cadastrado_em)}</TableTd>
            <TableTd>{atendimento.servico_detalhado.nome}</TableTd>
            <TableTd>{atendimento?.solicitante_detalhado?.nome ?? 'Ainda não atribuído'}</TableTd>
            <TableTd>{atendimento.atendido ? 'Sim' : 'Não'}</TableTd>
            <TableTd>
                <Group justify="center">
                    <Button variant="default" leftSection={<IconMessageCircle2 size={16} stroke={1.5} />}>Atender</Button>
                    <Button variant="default" leftSection={<IconEye size={16} stroke={1.5} />}>Ver</Button>
                </Group>
            </TableTd>
        </TableTr>
    ));
    return (
        <Table withColumnBorders withTableBorder highlightOnHover striped>
            <TableThead>
                <TableTr>
                    <TableTh>ID</TableTh>
                    <TableTh>Cadastrado Em</TableTh>
                    <TableTh>Serviço</TableTh>
                    <TableTh>Solicitante</TableTh>
                    <TableTh>Atendido</TableTh>
                    <TableTh>Ação</TableTh>
                </TableTr>
            </TableThead>
            <TableTbody>{linhas}</TableTbody>
        </Table>
    )
}