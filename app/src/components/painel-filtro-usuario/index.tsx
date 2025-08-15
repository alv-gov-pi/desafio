'use client'
import { Usuario } from '@/types/usuario';
import { useState, useEffect } from 'react';
import TabelaUsuario from '../tabelas/usuario';
import FiltroUsuario from '../forms/usuario/filtro';
import { parseAsStringEnum, parseAsString, parseAsBoolean, parseAsInteger, useQueryStates, Values } from 'nuqs'
import TableUsuariosSkeleton from '../tabelas/usuario/TableUsuariosSkeleton';
import { UsuarioService } from '@/services/UsuarioService';

type Filtro = {
    nome: string,
    mes: string,
    genero: string,
    status: number,
    setor: number
}

export function PainelFiltroUsuario({ token, setor, }: { usuarios: Usuario[], token: string, setor: number }) {
    const usuarioService: UsuarioService = new UsuarioService(token);
    const [filtro, setFiltro] = useQueryStates(
        {
            nome: parseAsString.withDefault(''),
            status: parseAsBoolean.withDefault(true),
            genero: parseAsString.withDefault(''),
        }
    );

    const [dados, setDados] = useState<Usuario[]>([]);
    const [carregando, setCarregando] = useState(true);
    // Fetch dos dados da API
    useEffect(() => {
        const carregarDados = async () => {
            try {

                const json = await usuarioService.obterUsuarios({'setor':setor});
                setDados(json);
            } catch (err) {
                console.error('Erro ao buscar dados:', err);
            } finally {
                setCarregando(false);
            }
        };

        carregarDados();
    }, []);


    const handleStatusChange = (id: number, novoStatus: boolean) => {
        setDados((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, esta_ativo: novoStatus } : item
            )
        );
    };

    const usuariosFiltrados = dados.filter((item) => {
        const nomeMatch = item.nome.toLowerCase().includes(filtro.nome.toLowerCase());
        const statusMatch = item.esta_ativo === filtro.status ?  true : false;
        const generoMatch = filtro.genero === item.genero || filtro.genero === 'T' ? true : false;
        return nomeMatch && statusMatch && generoMatch;
    });


    return (
        <FiltroUsuario usuarios={usuariosFiltrados} filtro={filtro} onSetFiltro={setFiltro}>
            {/* <Suspense fallback={<TableUsuariosSkeleton key={suspenseKey} />}> */}
                <TabelaUsuario token={token} usuarios={usuariosFiltrados} onChange={handleStatusChange} />
            {/* </Suspense> */}
        </FiltroUsuario>
    );
}