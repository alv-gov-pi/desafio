import TemplateApp from "@/components/template/autenticado/template";
import { Atendimento } from "@/types/atendimento";
import { Button, Group, Table, TableTr, TableTd, TableThead, TableTh, TableTbody } from '@mantine/core';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import BotaoExcluirSolicitacao from "@/components/buttons/excluir-solicitacao";
import React from "react";
import { IconEdit } from '@tabler/icons-react';

export default async function solicitacoes() {
    const session = await getServerSession(authOptions)
    const response = await fetch(`http://localhost:8000/solicitacoes/por-solicitante/7`, {
        method: "GET"
    })
    const solicitacoes: Atendimento[] = await response.json()

    if (!session) {
        redirect('/')
    }
    function formataStringDate(dataString: Date): string {
        const cadastradoEm = new Date(dataString);
        return cadastradoEm.toLocaleDateString();
    }
    const linhas = solicitacoes.map((atendimento) => (
        <TableTr key={`${atendimento.id}`}>
            <TableTd>{`${atendimento.id}`}</TableTd>
            <TableTd>{formataStringDate(atendimento.cadastrado_em)}</TableTd>
            <TableTd>{atendimento.servico.nome}</TableTd>
            <TableTd>{atendimento?.responsavel?.nome ?? 'Ainda não atribuído'}</TableTd>
            <TableTd>{atendimento.atendido ? 'Sim' : 'Não'}</TableTd>
            <TableTd>
                <Group justify="center">
                    <BotaoExcluirSolicitacao id={atendimento.id}/>
                    <Button variant="default"  leftSection={<IconEdit size={16} stroke={1.5} />}>Editar</Button>
                </Group>
            </TableTd>
        </TableTr>
    ));
    return (
        <TemplateApp >
            <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-10/12">
                <h1 className="text-xl font-semibold text-content-emphasis">Suas solicitações</h1>
                <Table withColumnBorders withTableBorder highlightOnHover striped>
                    <TableThead>
                        <TableTr>
                            <TableTh>ID</TableTh>
                            <TableTh>Cadastrado Em</TableTh>
                            <TableTh>Servico</TableTh>
                            <TableTh>Responsavel</TableTh>
                            <TableTh>Atendido</TableTh>
                            <TableTh>Ação</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>{linhas}</TableTbody>
                </Table>
            </div>
        </TemplateApp>
    )
}