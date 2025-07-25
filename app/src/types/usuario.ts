import { Setor } from "./setor"

export type Usuario = {
    id: number,
    nome: string,
    email: string,
    password: string,
    esta_ativo: boolean,
    genero: string,
    setor: number,
    setor_detalhado: Setor,
    cadastrado_em: Date,   
}

