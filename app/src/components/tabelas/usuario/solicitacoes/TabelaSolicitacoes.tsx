import { Button, Group, Table, TableTr, TableTd, TableThead, TableTh, TableTbody } from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import BotaoExcluirSolicitacao from "@/components/buttons/excluir-solicitacao";
import { Atendimento } from "@/types/atendimento";
import { formataStringDate } from '@/utils/databr';

export default function TabelaSolicitacoes({ solicitacoes }: { solicitacoes: Atendimento[] }) {
    const linhas = solicitacoes.map((atendimento) => (
        <TableTr key={`${atendimento.id}`}>
            <TableTd>{`${atendimento.id}`}</TableTd>
            <TableTd>{formataStringDate(atendimento.cadastrado_em)}</TableTd>
            <TableTd>{atendimento.servico_detalhado.nome}</TableTd>
            <TableTd>{atendimento?.responsavel_detalhado?.nome ?? 'Ainda não atribuído'}</TableTd>
            <TableTd>{atendimento.atendido ? 'Sim' : 'Não'}</TableTd>
            <TableTd>
                <Group justify="center">
                    <BotaoExcluirSolicitacao id={atendimento.id} />
                    <Button variant="default" leftSection={<IconEdit size={16} stroke={1.5} />}>Editar</Button>
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
                    <TableTh>Responsavel</TableTh>
                    <TableTh>Atendido</TableTh>
                    <TableTh>Ação</TableTh>
                </TableTr>
            </TableThead>
            <TableTbody>{linhas}</TableTbody>
        </Table>
    )
}