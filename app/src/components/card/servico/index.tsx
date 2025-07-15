import { Servico } from '@/types/servico';
import {  Button } from '@mantine/core';

export default function CardServico({servico}: {servico: Servico}) {

  return (
    <div className='flex justify-center'>
        <div className='w-4/12'>
          <img src="/default-servico-profile.svg" alt={servico.nome} className='w-52'/>
        </div>
        <div className='w-8/12'>
            <h5 className='text-center font-semibold'>{servico.nome}</h5>
            <p>{servico.descricao}</p>
            <Button component='a' variant="filled" href={`/solicitacoes/confirmacao/${servico.id}`}>Solicitar</Button>
        </div>
    </div>
  );
}