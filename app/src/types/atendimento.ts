import { Servico } from "./servico"
import { Usuario } from "./usuario"

export type Atendimento = {
    id?: number,
    servico: number,
    servico_detalhado?: Servico,
    solicitante: number,
    solicitante_detalhado?: Usuario,
    responsavel?: number,
    responsavel_detalhado?: Usuario,
    atendido?: boolean,
    cadastrado_em?: Date,
    observacao?: string,
    solucao?: string,
    resolvido_em?: Date
}

