'use client';

import { AtendimentoService } from '@/services/AtendimentoService';
import { Atendimento } from '@/types/atendimento';
import { formataStringDate } from '@/utils/databr';
import { Button, Textarea } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import { redirect } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';
export default function FormFinalizaAtendimento({atendimento} : {atendimento: Atendimento}) {
    const atendimentoService = new AtendimentoService();
    const [AtendimentoAtual, setAtendimentoAtual] = useState(atendimento);
    function finalizar(event: SyntheticEvent) {
        event.preventDefault();
        atendimentoService.finalizarAtendimento(AtendimentoAtual);
        redirect(`/usuario/${AtendimentoAtual.responsavel}/atendimentos`)
    }
    return (
        <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-10/12">
                <h1 className="text-xl font-semibold text-content-emphasis">Atendimento {atendimento.id}</h1>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <div ><span className="font-semibold text-content-emphasis">Solicitante:</span> {atendimento.solicitante_detalhado.nome}</div>
                        <div ><span className="font-semibold text-content-emphasis">Status:</span> {atendimento.atendido ? 'Fechado' : 'Aberto'}</div>
                    </div>
                    <div className="flex flex-col">
                        <div ><span className="font-semibold text-content-emphasis">email:</span> {atendimento.solicitante_detalhado.email}</div>
                        <div ><span className="font-semibold text-content-emphasis">Abertura:</span> {formataStringDate(atendimento.cadastrado_em)}</div>
                    </div>
                    <div className="flex flex-col">
                        <div ><span className="font-semibold text-content-emphasis">setor:</span> {atendimento.solicitante_detalhado.setor.nome}</div>
                        <div ><span className="font-semibold text-content-emphasis">Serviço:</span> {atendimento.servico_detalhado.nome}</div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <h1 className="font-semibold text-content-emphasis">Observações</h1>
                    <p>{atendimento.observacao}</p>
                </div>
                <div className="flex flex-col">
                    <form onSubmit={finalizar}>
                        <Textarea
                            label="Solução"
                            description="Solução de forma resumida"
                            placeholder="Informe a solução para encerrar o chamado"
                            value={AtendimentoAtual.solucao}
                            onChange={(e) => setAtendimentoAtual({...AtendimentoAtual, 'solucao': e.target.value})}
                        />
                        <div className='flex justify-end mt-1'>
                            <Button type='submit' rightSection={<IconCheck size={14} />}>Finalizar</Button>
                        </div>
                    </form>
                </div>
            </div>
    )
}