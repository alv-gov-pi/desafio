'use client'
import CardPadrao from '@/components/card';
import { Group, Select, Input, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Usuario } from '@/types/usuario';
import gerarCSV from '@/utils/arrayToCSV';

type Filtro = {
    nome: string,
    status: boolean,
    genero: string,
}


interface FiltroUsuarioProps {
    children: React.ReactNode,
    usuarios: Usuario[],
    filtro: Filtro,
    onSetFiltro: (e) => void,
    // nome: string,
    // status: boolean,
    // genero: string,
    // setNome: (e: string) => void,
    // setStatus: (e: boolean) => void,
    // setGenero: (e: string) => void,
}

export default function FiltroUsuario({ children, usuarios, filtro, onSetFiltro/*nome, status, genero, setNome, setStatus, setGenero*/ }: FiltroUsuarioProps) {

    const form = useForm({
        mode: 'uncontrolled',
        // initialValues: filtros,
    });

    function filtrar(formData) {
        console.log("dentro do filtrar " + JSON.stringify(usuarios))
        gerarCSV(usuarios)
    }
    return (
        <>
            <CardPadrao titulo='Filtre os resultados'>
                <form onSubmit={form.onSubmit((values) => filtrar(values))}>
                    <Group>
                        <Select
                            onChange={(value, option) => onSetFiltro({...filtro, genero: value})}
                            label="Gênero"
                            value={filtro.genero}
                            placeholder="Filtre por Gênero"
                            data={[{ value: 'T', label: 'Todos' }, { value: 'M', label: 'Masculino' }, { value: 'F', label: 'Feminino' }]}
                        />
                        <Select
                            label="Mês cadastro"
                            placeholder="Selecione uma opção"
                            // defaultValue={filtros.mes}
                            // onChange={(value, option) => setFiltros({ ...filtros, 'mes': value })}
                            data={['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho']}
                        />
                        <Select
                            label="Status"
                            placeholder="Selecione uma opção"
                            defaultValue={filtro.status ? 'A' : 'I'}
                            onChange={(value, option) => onSetFiltro({...filtro, status: value === 'A' ? true : false})}
                            data={[{ value: 'T', label: 'Todos' }, { value: 'A', label: 'Ativo' }, { value: 'I', label: 'Inativo' }]}
                        />
                        <Input.Wrapper label="Nome" >
                            <Input placeholder="digite ao menos 3 letras"
                                defaultValue={filtro.nome}
                                onChange={(event) => onSetFiltro({...filtro, nome: event.target.value})}
                            />
                        </Input.Wrapper>
                        <Button type="submit" className='mt-6'>Baixar csv</Button>
                    </Group>
                </form>
            </CardPadrao>
            {children}
        </>
    );
}