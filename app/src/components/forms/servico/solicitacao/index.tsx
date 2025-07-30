'use client'
import { useForm } from '@mantine/form';
import { Textarea, Button } from '@mantine/core';
import { useState } from 'react';
import { Servico } from '@/types/servico';
import { Usuario } from '@/types/usuario';
import { redirect } from "next/navigation";
import { AtendimentoService } from '@/services/AtendimentoService';
import { Atendimento } from '@/types/atendimento';

type props = {
    solicitante: Usuario
    servico: Servico
    token: string
}
export default function FormSolicitacaoServico({ props }: { props: props }) {
    const [observacao, setObservacao] = useState('');
    const atendimentoService: AtendimentoService = new AtendimentoService(props.token);

    async function enviarSolicitacao(e: any) {
        e.preventDefault();
        console.log(e);
        const atendimento: Atendimento = {"servico": props.servico.id, "solicitante": props.solicitante.id, "observacao": observacao};
        atendimentoService.adicionarAtendimento(atendimento)
        redirect(`/usuario/${props.solicitante.id}/solicitacoes`)
    }
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { observacao: '' },
    });

    return (
        <div className='space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-10/12'>
            <h1 className='text-xl font-semibold text-content-emphasis'>Formulário de solicitação</h1>
            <h2 className='text-xl font-semibold text-content-emphasis'>Informçõs sobre o serviço/observações necessárias</h2>
            <p>{props.servico.descricao}</p>
            <form onSubmit={enviarSolicitacao}>

                <Textarea
                    label="observacao"
                    placeholder="observacao"
                    key={form.key('observacao')}
                    {...form.getInputProps('observacao')}
                    onChange={(e) => setObservacao(e.target.value)}
                />
                <Button type="submit" mt="sm">
                    Salvar
                </Button>
            </form>
        </div>
    );
}