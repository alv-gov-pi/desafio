import { Servico } from "./servico"

export type Setor = {
    id: number,
    nome: string,
    sigla: string
    servicos: Servico[]
}