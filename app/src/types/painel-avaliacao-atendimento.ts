import { Servico } from "./servico"
export type PainelAvaliacaoServico = {
    id: Number,
    nome: string,
    servico_avaliado: Servico,
    esta_visivel: true
}