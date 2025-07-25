import { Atendimento } from "@/types/atendimento";
import { BaseService } from "./BaseService";
import { InteracaoAtendimento } from "@/types/interacao-atendimento";
import { AvaliacaoAtendimento } from "@/types/avaliacao-atendimento";

export class AtendimentoService extends BaseService {

    constructor() {
        super()
        this.dominio = 'atendimento';
    }

    async obterSolicitacoesPorSolicitanteId(solicitanteId: number): Promise<Atendimento[]> {
        const response = await fetch(`http://localhost:8000/solicitacoes/por-solicitante/${solicitanteId}`, {
            method: "GET"
        })
        const solicitacoes: Atendimento[] = await response.json()
        return solicitacoes
    }
    async obterAtendimentoPorId(idAtendimento: string): Promise<Atendimento> {
        const response = await fetch(`${this.obterUrlDominio()}/${idAtendimento}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar os dados ${response}`);
        }

        const atendimento: Atendimento = await response.json();
        return atendimento;
    }
    async finalizarAtendimento(atendimento: Atendimento) {
        const data = JSON.stringify({
            "id": atendimento.id,
            "responsavel": atendimento.responsavel,
            "servico": atendimento.servico,
            "solicitante": atendimento.solicitante,
            "solucao": atendimento.solucao,
            "atendido": true,
            "resolvido_em": new Date()
        })
        console.log(data)
        const response = await fetch(`${this.obterUrlDominio()}/${atendimento.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        });
    }

    async adicionarAvaliacaoAtendimento(avaliacaoAtendimento: AvaliacaoAtendimento, idAtendimento: number) {
        console.log(avaliacaoAtendimento)
        const response = await fetch(`${this.obterUrlDominio()}/${idAtendimento}/avaliacao/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(avaliacaoAtendimento)
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar avaliacao de atendimento ${response}`);
        }

        const novaAvaliacaoAtendimento: AvaliacaoAtendimento = await response.json();
        return novaAvaliacaoAtendimento;
    }

    async adicionarInterecaoAtendimento(interacao: InteracaoAtendimento): Promise<InteracaoAtendimento> {
        const response = await fetch(`${this.obterUrlDominio()}/${interacao.idAtendimento}/interacao/adicionar/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 'atendimento': interacao.idAtendimento, 'texto': interacao.texto, 'tipoUsuario': interacao.tipoUsuario })
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar interacao ${response}`);
        }

        const interacaoAtendimento: InteracaoAtendimento = await response.json();
        return interacaoAtendimento;
    }

    async obterInteracoesPorAtendimeto(idAtendimento: string): Promise<InteracaoAtendimento[]> {
        const response = await fetch(`http://localhost:8000/atendimento/${idAtendimento}/interacoes/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar os dados ${response}`);
        }

        const interacoes: InteracaoAtendimento[] = await response.json();
        return interacoes;
    }

    async atualizaResponsavel(idUsuarioLogado: Number, atendimento: Atendimento): Promise<Atendimento> {
        const response = await fetch(`${this.obterUrlDominio()}/${atendimento.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": atendimento.id,
                "responsavel": idUsuarioLogado,
                "servico": atendimento.servico,
                "solicitante": atendimento.solicitante
            }),
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
        }

        const data = await response.json();
        return data;
    }

    async obterAtentimentoPorServicos(servicos_string: String): Promise<Atendimento[]> {
        try {
            console.log(`${this.obterUrlDominio()}/por-setor/?ids=${servicos_string}/`)
            const response = await fetch(`http://localhost:8000/atendimentos/por-setor/?ids=9`, {
                method: "GET"
            })

            const atendimentos: Atendimento[] = await response.json()
            return atendimentos
        } catch (error) {
            throw new Error(`Erro ao solicitar os dados, detalhes: ${error}`);
        }
    }
}