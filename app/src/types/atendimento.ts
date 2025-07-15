import { Servico } from "./servico"
import { Usuario } from "./usuario"

export type Atendimento = {
    id: number,
    servico: Servico,
    solicitante: Usuario,
    responsavel: Usuario,
    atendido: boolean,
    cadastrado_em: Date
}

