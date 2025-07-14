import { Setor } from "./setor"

export type Servico = {
    id: Number,
    nome: string,
    descricao: string,
    imagem_url: string,
    setor_ofetante: Setor
}
