import { Servico } from "./servico"

export type Setor = {
    id: Number,
    nome: string,
    sigla: string
    servicos: Servico[]
}