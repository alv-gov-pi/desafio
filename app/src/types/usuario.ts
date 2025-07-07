import { Setor } from "./setor"

export type Usuario = {
    id: Number,
    nome: string,
    email: string,
    password: string,
    esta_ativo: boolean,
    genero: string,
    setor: Setor
    cadastrado_em: Date,   
}

