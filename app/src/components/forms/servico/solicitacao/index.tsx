'use client'
import { useForm } from '@mantine/form';
import { Textarea, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Servico } from '@/types/servico';
import { Usuario } from '@/types/usuario';
import { redirect } from "next/navigation";

type props = {
    solicitante: Usuario
    servico: Servico
}
export default function FormSolicitacaoServico({ props }: { props: props }) {
    const [observacao, setObservacao] = useState('');

    async function enviarSolicitacao(e: any) {
        e.preventDefault();

        const responseAtendimento = await fetch(`http://localhost:8000/atendimentos/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"servico": props.servico.id, "solicitante": props.solicitante.id, observacao})
        })
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