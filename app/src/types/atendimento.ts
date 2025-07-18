import { Servico } from "./servico"
import { Usuario } from "./usuario"

export type Atendimento = {
    id: number,
    servico: Servico,
    servico_detalhado: Servico,
    solicitante: Usuario,
    solicitante_detalhado: Usuario,
    responsavel: number,
    responsavel_detalhado: Usuario,
    atendido: boolean,
    cadastrado_em: Date,
    observacao: string,
    solucao: string
}

