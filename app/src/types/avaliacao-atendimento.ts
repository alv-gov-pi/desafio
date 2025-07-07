import { Servico } from "./servico"
import { Setor } from "./setor"

export type AvaliacaoAtendimento = {
    id: Number,
    nota: number,
    genero_solicitante: string
    servico_solicitado: Servico,
    setor_solicitante: Setor,
    cadastrado_em: Date
}

