import { Setor } from "./setor"

export type Usuario = {
    id: number,
    nome: string,
    email: string,
    password: string,
    esta_ativo: boolean,
    genero: string,
    setor: number
    cadastrado_em: Date,   
}

