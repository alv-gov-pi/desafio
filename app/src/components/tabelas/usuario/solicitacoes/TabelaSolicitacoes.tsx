import { Table, TableTr, TableTd, TableThead, TableTh, TableTbody } from '@mantine/core';
import { Atendimento } from "@/types/atendimento";
import { formataStringDate } from '@/utils/databr';
import AcoesAtendimento from '@/components/buttons/acoes-solicitacao';
import { FormAvaliacaoAtendimento } from '@/components/forms/atendimento/form-avaliacao-atendimento';

export default function TabelaSolicitacoes({ solicitacoes, token }: { solicitacoes: Atendimento[], token: string }) {
    let linhas;
    if (!!solicitacoes) {
        console.log("Gerou linhas")
        linhas = solicitacoes.map((atendimento) => (
            <TableTr key={`${atendimento.id}`}>
                <TableTd>{`${atendimento.id}`}</TableTd>
                <TableTd>{formataStringDate(atendimento.cadastrado_em)}</TableTd>
                <TableTd>{atendimento.servico_detalhado.nome}</TableTd>
                <TableTd>{atendimento?.responsavel_detalhado?.nome ?? 'Ainda não atribuído'}</TableTd>
                <TableTd>{atendimento.atendido ? 'Sim' : 'Não'}</TableTd>
                <TableTd>
                    {!atendimento.atendido &&
                        <AcoesAtendimento atendimento={atendimento} token={token} />}
                    {atendimento.atendido && !atendimento.avaliado &&
                        <FormAvaliacaoAtendimento atendimento={atendimento} token={token} />}
                    {atendimento.atendido && atendimento.avaliado &&
                       'Obrigado pela avaliação'}
                </TableTd>
            </TableTr>
        ));
    }
    return (
        <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-9/12">
            <h1 className="text-xl font-semibold text-content-emphasis">Suas solicitações</h1>
            <Table withColumnBorders withTableBorder highlightOnHover striped captionSide="bottom">
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
        </div>
    )
}